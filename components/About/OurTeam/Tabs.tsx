"use client";
import { boardType } from "@/clientTypes";
import Image from "next/image";
import { useState } from "react";
import styles from "./Tabs.module.css";

interface TabsProps {
  board: boardType[] | null;
}

const Tabs = ({ board }: TabsProps) => {
  const [numberTab, setNumberTab] = useState<number>(0);

  const safeBoard = board || [];

  const boardMembers = safeBoard.filter(
    (member: boardType) => member.category === "board",
  );
  const countryCoordinators = safeBoard.filter(
    (member: boardType) => member.category === "country",
  );
  const advisoryBoard = safeBoard.filter(
    (member: boardType) => member.category === "advisory",
  );

  const renderMembers = (members: boardType[]) => {
    if (members.length === 0) {
      return <div className={styles.noMembers}>No members found.</div>;
    }

    return (
      <div className={styles.membersGrid}>
        {members.map((member) => (
          <div key={member._id} className={styles.memberCard}>
            <div className={styles.memberRow}>
              <div className={styles.avatar}>
                <Image
                  src={member.mainImage || "/placeholder.jpg"}
                  alt={member.name}
                  fill
                  className={styles.avatarImage}
                  sizes="70px"
                />
              </div>
              <div className={styles.memberInfo}>
                <h3 className={styles.memberName}>{member.name}</h3>
                <p className={styles.memberDetail}>{member.post}</p>
                {member.email && (
                  <p className={styles.memberDetail}>
                    <a href={`mailto:${member.email}`} className={styles.emailLink}>{member.email}</a>
                  </p>
                )}
              </div>
            </div>
            {member.body && (
              <p className={styles.memberBody}>
                {member.body}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabBar}>
        <button
          className={`${styles.tab} ${numberTab === 0 ? styles.tabActive : styles.tabInactive}`}
          onClick={() => setNumberTab(0)}>
          Board
        </button>
        <button
          className={`${styles.tab} ${numberTab === 1 ? styles.tabActive : styles.tabInactive}`}
          onClick={() => setNumberTab(1)}>
          Country Coordinators
        </button>
        <button
          className={`${styles.tab} ${numberTab === 2 ? styles.tabActive : styles.tabInactive}`}
          onClick={() => setNumberTab(2)}>
          Advisory Board
        </button>
      </div>
      <div className={styles.content}>
        {numberTab === 0 && renderMembers(boardMembers)}
        {numberTab === 1 && renderMembers(countryCoordinators)}
        {numberTab === 2 && renderMembers(advisoryBoard)}
      </div>
    </div>
  );
};

export default Tabs;
