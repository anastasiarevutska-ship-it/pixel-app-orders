/** H5 section title, e.g. "Just for You", "Featured Resources". */
export function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="t-h5" style={{ color: 'var(--color-navy-80)', whiteSpace: 'nowrap' }}>
      {children}
    </h2>
  );
}
