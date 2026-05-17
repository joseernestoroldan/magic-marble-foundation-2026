"use client";

import { useState, useCallback } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  chartData,
  chartYears,
  getYearTotal,
  type ChartEntry,
} from "@/utils/chartsData";

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
    <div className="rounded-xl border border-cyan-700/30 bg-gray-900/95 px-4 py-3 shadow-xl backdrop-blur-sm">
      <p className="mb-1 text-sm font-semibold text-cyan-300">{category}</p>
      <p className="text-sm text-gray-200">
        <span className="font-medium text-white">
          ${amount.toLocaleString("en-US")}
        </span>
      </p>
      <p className="text-xs text-gray-400">{percentage}% of total</p>
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
    <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
      {payload.map((entry) => {
        const data = entry.payload?.payload;
        return (
          <li key={entry.value} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-700 font-medium">{entry.value}</span>
            {data && (
              <span className="text-gray-400 text-xs">
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

  // Only show label if the slice is big enough (>10%)
  if (percentage < 10) return null;

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      className="fill-white text-xs font-semibold drop-shadow-md pointer-events-none"
    >
      <tspan x={x} dy="-0.5em">
        ${amount.toLocaleString("en-US")}
      </tspan>
      <tspan x={x} dy="1.3em" className="text-[10px] opacity-80">
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
    <div className="flex w-full flex-col items-center gap-8 pt-24">
      {/* ---- Title ---- */}
      <div className="text-center">
        <h2 className="text-cyan-600 font-bold text-4xl text-center">
          Expenditure Breakdown
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Total for {selectedYear}:{" "}
          <span className="font-semibold text-cyan-700">
            ${total.toLocaleString("en-US")}
          </span>
        </p>
      </div>

      {/* ---- Year selector tabs ---- */}
      <div className="flex gap-2 rounded-full bg-gray-100 p-1 shadow-inner">
        {chartYears.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`
              rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300
              ${
                selectedYear === year
                  ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/30"
                  : "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              }
            `}
          >
            {year}
          </button>
        ))}
      </div>

      {/* ---- Pie Chart ---- */}
      <div className="w-full max-w-lg">
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
                  className="transition-opacity duration-200"
                  opacity={
                    activeIndex === null || activeIndex === index ? 1 : 0.45
                  }
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ---- Breakdown cards ---- */}
      <div className="flex w-full max-w-lg flex-col gap-3 px-4">
        {entries.map((entry) => (
          <div
            key={entry.category}
            className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-4 w-4 rounded-full shadow-sm"
                style={{ backgroundColor: entry.fill }}
              />
              <span className="text-sm font-medium text-gray-700">
                {entry.category}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                ${entry.amount.toLocaleString("en-US")}
              </p>
              <p className="text-xs text-gray-400">{entry.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;