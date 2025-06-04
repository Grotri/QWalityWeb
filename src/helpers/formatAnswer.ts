export const formatAnswer = (text: string) => {
  const preprocessedText = text.replace(
    /(Автоматическая очистка:|Automatic cleaning:|Система анализирует изображение с помощью ИИ:|The system analyzes the image using AI:)/g,
    "\n\n$1"
  );

  return preprocessedText.split("\n").flatMap((line) => {
    if (line.includes("• ")) {
      return line
        .split("• ")
        .map((item, index) => {
          const trimmed = item.trim();
          if (trimmed === "") return null;
          return index === 0 && !line.trim().startsWith("•")
            ? trimmed
            : "• " + trimmed;
        })
        .filter(Boolean);
    }
    return [line.trim()];
  });
};
