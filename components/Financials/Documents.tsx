import { fetchFiles } from "@/app/lib/apiCalls";
import { GoogleDriveFile, GroupedFiles } from "@/types/types";
import { ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

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
  <div className="rounded-[5px] border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
    {/* folder header */}
    <div className="border-b border-gray-100 px-5 py-3">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {folderName}
      </h3>
    </div>

    {/* file list */}
    <ul className="divide-y divide-gray-100">
      {files.map((file) => (
        <li key={file.id}>
          <Link
            href={file.webViewLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-4 px-5 py-3 transition-colors hover:bg-cyan-50/50 group"
          >
            <span className="flex items-center gap-3 min-w-0">
              <FileText className="h-4 w-4 shrink-0 text-cyan-600" />
              <span className="text-sm font-medium text-gray-700 truncate group-hover:text-cyan-700 transition-colors">
                {file.name}
              </span>
            </span>

            <ExternalLink className="h-4 w-4 shrink-0 text-gray-300 group-hover:text-cyan-600 transition-colors" />
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
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-6">
      <h2 className="text-cyan-600 font-bold text-4xl text-center">{title}</h2>

      <div className="w-full flex flex-col gap-4">
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
    <div className="w-full flex flex-col items-center gap-16 pb-24">
      <DocumentSection title="Financial Documents" folders={financialFolders} />
      <DocumentSection title="Other Documents" folders={otherFolders} />
    </div>
  );
};

export default Documents;
