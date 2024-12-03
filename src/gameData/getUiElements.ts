export async function getUiElements() {
  const res = await fetch(`http://localhost:8081`);

  return await res.json() as string[];
}