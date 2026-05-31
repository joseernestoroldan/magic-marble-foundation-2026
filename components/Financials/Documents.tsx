import { fetchFiles } from "@/app/lib/apiCalls";
import { GoogleDriveFile, GroupedFiles } from "@/types/types";
import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";
import styles from "./Documents.module.css";

/* -------------------------------------------------------------------------- */
/*  Folder card — renders one folder and its file rows                        */
/* -------------------------------------------------------------------------- */
const FolderCard = ({
  folderName,
  files,
}: {
  folderName: string;
  files: GoogleDriveFile[];
}) => (
  <div className={styles.card}>
    {/* folder header */}
    <div className={styles.cardHeader}>
      <h3 className={styles.cardHeaderTitle}>
        {folderName}
      </h3>
    </div>

    {/* file list */}
    <ul className={styles.fileList}>
      {files.map((file) => (
        <li key={file.id} className={styles.fileListItem}>
          <Link
            href={file.webViewLink}
            target="_blank"
            rel="noreferrer"
            className={styles.fileLink}
          >
            <span className={styles.fileLeft}>
              <FileText className={styles.fileIcon} />
              <span className={styles.fileName}>
                {file.name}
              </span>
            </span>

            <ExternalLink className={styles.fileExternalIcon} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Section — heading + list of folder cards                                  */
/* -------------------------------------------------------------------------- */
const DocumentSection = ({
  title,
  folders,
}: {
  title: string;
  folders: GroupedFiles[];
}) => {
  if (folders.length === 0) return null;

  // Show most recent folders first (preserves original reversed order)
  const reversed = [...folders].reverse();

  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>

      <div className={styles.folderList}>
        {reversed.map((folder) => (
          <FolderCard
            key={folder.folderName}
            folderName={folder.folderName}
            files={folder.files}
          />
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Documents — server component (data fetching + grouping)                   */
/* -------------------------------------------------------------------------- */
const Documents = async () => {
  const query = await fetchFiles();
  const data = query.data;

  // Group files by folderName (typed accumulator instead of any[])
  const grouped = data.reduce<Record<string, GoogleDriveFile[]>>(
    (acc, file) => {
      const { folderName } = file;
      if (!acc[folderName]) {
        acc[folderName] = [];
      }
      acc[folderName].push(file);
      return acc;
    },
    {}
  );

  // Convert to GroupedFiles array
  const files: GroupedFiles[] = Object.keys(grouped).map((folderName) => ({
    folderName,
    files: grouped[folderName],
  }));

  // Separate financial docs from "Other Documents"
  const financialFolders = files.filter(
    (f) => f.folderName !== "Other Documents"
  );
  const otherFolders = files.filter(
    (f) => f.folderName === "Other Documents"
  );

  return (
    <div className={styles.root}>
      <DocumentSection title="Financial Documents" folders={financialFolders} />
      <DocumentSection title="Other Documents" folders={otherFolders} />
    </div>
  );
};

export default Documents;
