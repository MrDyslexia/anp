// src/api/queries.ts

const BASE_URL = process.env.EXPO_BASE_URL

interface Medicion {
  comuna: string;
  region: string;
  medicion: {
    aqi: number;
    status: string;
    fecha: string;
    [key: string]: any;
  };
}

export async function listarRegiones(): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/listarRegiones`);
  if (!res.ok) throw new Error("Error al listar regiones");
  return await res.json();
}

export async function listarComunas(): Promise<any[]> {
  const res = await fetch(`${BASE_URL}/listarComunas`);
  if (!res.ok) throw new Error("Error al listar comunas");
  return await res.json();
}

export async function listarColecciones(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/listarColecciones`);
  if (!res.ok) throw new Error("Error al listar colecciones");
  const json = await res.json();
  return json.colecciones;
}

export async function obtenerCalidadAire(comuna: string, region: string): Promise<any> {
  const url = `${BASE_URL}/getAirQualityByComuna?comuna=${encodeURIComponent(comuna)}&region=${encodeURIComponent(region)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener calidad del aire");
  return await res.json();
}

export async function obtenerHistorialCalidadAire(comuna: string): Promise<any> {
  const url = `${BASE_URL}/getAirQualityHistory?comuna=${encodeURIComponent(comuna)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener historial de calidad del aire");
  return await res.json();
}

export async function testAPI(comuna: string, region: string): Promise<any> {
  const url = `${BASE_URL}/testAPI?comuna=${encodeURIComponent(comuna)}&region=${encodeURIComponent(region)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error en testAPI");
  return await res.json();
}

export async function ejecutarIngestionDiaria(): Promise<{ status: string; message: string }> {
  const res = await fetch(`${BASE_URL}/runDailyIngestion`);
  if (!res.ok) throw new Error("Error al ejecutar ingestión diaria");
  return await res.json();
}

export async function testComunaManual(): Promise<Medicion> {
  const res = await fetch(`${BASE_URL}/testComunaManual`);
  if (!res.ok) throw new Error("Error en test manual de comuna");
  return await res.json();
}

export async function setUserPreferences(uid: string, preferences: any, idToken: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/setUserPreferences`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uid, preferences }),
  });
  if (!res.ok) throw new Error("Error al guardar preferencias de usuario");
  return await res.json();
}

export async function getUserPreferences(uid: string, idToken: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/getUserPreferences?uid=${encodeURIComponent(uid)}`, {
    headers: {
      "Authorization": `Bearer ${idToken}`,
    },
  });
  if (!res.ok) throw new Error("Error al obtener preferencias del usuario");
  return await res.json();
}
