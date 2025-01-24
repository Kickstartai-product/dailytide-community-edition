const formatSummary = (summary: string) => {
  return summary
    .split(/- |• /)
    .map((part: string, index: number) => <p key={index}>{index ? `• ${part}\n` : `${part}\n`}</p>);
};

export { formatSummary };
