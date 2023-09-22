export function convertBytes(bytes: number) {
  const sizes = ["B", "KB", "MB", "GB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const convertedValue = Math.floor(bytes / Math.pow(1024, i));
  return `${convertedValue} ${sizes[i]}`;
}

export function formatNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
