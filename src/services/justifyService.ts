export const justifyText = (text: string): string => {
    const words = text.split(/\s+/);
    const maxLineLength = 80;
    let line = "";
    const lines = [];
  
    words.forEach((word) => {
      if ((line + word).length <= maxLineLength) {
        line += (line ? " " : "") + word;
      } else {
        lines.push(justifyLine(line, maxLineLength));
        line = word;
      }
    });
    
    if (line) lines.push(justifyLine(line, maxLineLength));
  
    return lines.join("\n");
  };
  
  const justifyLine = (line: string, length: number): string => {
    const gaps = line.split(" ").length - 1;
    if (gaps === 0) return line.padEnd(length);
  
    const spacesNeeded = length - line.replace(/\s+/g, "").length;
    const spacePerGap = Math.floor(spacesNeeded / gaps);
    const extraSpaces = spacesNeeded % gaps;
  
    return line
      .split(" ")
      .map((word, index) => word + " ".repeat(index < extraSpaces ? spacePerGap + 1 : spacePerGap))
      .join("")
      .trim();
  };
  