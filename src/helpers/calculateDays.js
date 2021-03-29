export default function calculateDays(start, end) {
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
}
