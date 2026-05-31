"use client";

import {
  chartData,
  chartYears,
  getYearTotal,
  type ChartEntry,
} from "@/utils/chartsData";
import { useCallback, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styles from "./Charts.module.css";

/* -------------------------------------------------------------------------- */
/*  Custom tooltip                                                            */
/* -------------------------------------------------------------------------- */
interface TooltipProps {
  active?: boolean;
  payload?: { payload: ChartEntry }[];
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  const { category, amount, percentage } = payload[0].payload;

  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipCategory}>{category}</p>
      <p className={styles.tooltipAmount}>
        <span className={styles.tooltipAmountSpan}>
          ${amount.toLocaleString("en-US")}
        </span>
      </p>
      <p className={styles.tooltipPercent}>{percentage}% of total</p>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Custom legend                                                             */
/* -------------------------------------------------------------------------- */
interface LegendEntry {
  value: string;
  color?: string;
  payload?: { payload: ChartEntry };
}

const CustomLegend = ({ payload }: { payload?: LegendEntry[] }) => {
  if (!payload) return null;
  return (
    <ul className={styles.legend}>
      {payload.map((entry) => {
        const data = entry.payload?.payload;
        return (
          <li key={entry.value} className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ backgroundColor: entry.color }}
            />
            <span className={styles.legendLabel}>{entry.value}</span>
            {data && (
              <span className={styles.legendAmount}>
                (${data.amount.toLocaleString("en-US")} · {data.percentage}%)
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

/* -------------------------------------------------------------------------- */
/*  Custom active-shape label (renders inside the pie on hover)               */
/* -------------------------------------------------------------------------- */
interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percentage: number;
  category: string;
  amount: number;
}

const RADIAN = Math.PI / 180;

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percentage,
  amount,
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percentage < 10) return null;

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      className={styles.pieLabel}
    >
      <tspan x={x} dy="-0.5em">
        ${amount.toLocaleString("en-US")}
      </tspan>
      <tspan x={x} dy="1.3em" className={styles.pieLabelPercent}>
        {percentage}%
      </tspan>
    </text>
  );
};

/* -------------------------------------------------------------------------- */
/*  Main Charts component                                                     */
/* -------------------------------------------------------------------------- */
const Charts = () => {
  const [selectedYear, setSelectedYear] = useState<number>(chartYears[0]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const entries = chartData[selectedYear] ?? [];
  const total = getYearTotal(selectedYear);

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* ---- Title ---- */}
      <div className={styles.titleSection}>
        <h2 className={styles.title}>
          Expenditure Breakdown
        </h2>
        <p className={styles.subtitle}>
          Total for {selectedYear}:{" "}
          <span className={styles.subtitleTotal}>
            ${total.toLocaleString("en-US")}
          </span>
        </p>
      </div>

      {/* ---- Year selector tabs ---- */}
      <div className={styles.tabs}>
        {chartYears.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={selectedYear === year ? styles.tabActive : styles.tab}
          >
            {year}
          </button>
        ))}
      </div>

      {/* ---- Pie Chart ---- */}
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie
              data={entries}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={145}
              paddingAngle={3}
              cornerRadius={6}
              stroke="none"
              label={renderCustomLabel}
              labelLine={false}
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              animationBegin={0}
              animationDuration={600}
              animationEasing="ease-out"
            >
              {entries.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={entry.fill}
                  className={styles.cellTransition}
                  opacity={
                    activeIndex === null || activeIndex === index ? 1 : 0.45
                  }
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className={styles.legendContainer}>
          <CustomLegend payload={entries.map((e) => ({
            value: e.category,
            color: e.fill,
            payload: { payload: e },
          }))} />
        </div>
      </div>

      {/* ---- Breakdown cards ---- */}
      <div className={styles.cardsSection}>
        {entries.map((entry) => (
          <div
            key={entry.category}
            className={styles.card}
          >
            <div className={styles.cardLeft}>
              <span
                className={styles.cardDot}
                style={{ backgroundColor: entry.fill }}
              />
              <span className={styles.cardLabel}>
                {entry.category}
              </span>
            </div>
            <div className={styles.cardRight}>
              <p className={styles.cardAmount}>
                ${entry.amount.toLocaleString("en-US")}
              </p>
              <p className={styles.cardPercent}>{entry.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;