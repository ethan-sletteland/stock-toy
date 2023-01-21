
const server = 'http://0.0.0.0/'

export function fetchTickers() {
  return fetch(server + 'stock')
    .then((result) => result.json())
    .then((result) => result.data.table.rows.map((row: { name: any; symbol: any }) => {
      return {
        label: `${row.symbol} ${row.name}`, id: row.symbol
      }
    })
  )
}

export async function fetchStock(symbol: string) {
  const result = await fetch(`${server}stock?ticker=${encodeURIComponent(symbol)}`);
  const result_2 = await result.json();
  return result_2;
}

export async function fetchMyStock(userId: number) {
  const result = await fetch(`${server}portfolio?id=${userId}`);
  const result_2 = await result.json();
  return result_2;
}

export async function buyStock(userId: number, stock: Stock) {
  console.log(JSON.stringify({
      userId,
      ...stock
    }))
  const result = await fetch(`${server}portfolio`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      userId,
      ...stock
    })
  });
  const result_2 = await result.json();
  return result_2;
}

export async function sellStock(key: string) {
  const result = await fetch(`${server}portfolio?key=${key}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    method: 'DELETE'
  });
  const result_2 = await result.json();
  return result_2;
}

export interface Stock { 
  key?: string;
  name: string;
  shortName: string;
  symbol: string;
  logo_url?: string;
  ask?: number
}