export default function groupByYear(array) {
  return array.reduce((acc, obj) => {
    const property = obj["year"];
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, []);
}
