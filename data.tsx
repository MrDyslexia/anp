export const user = {
  name: "Juan Pérez",
  email: "defaultemail@email.com",
  isLoading: true,
  region: {
    id: 1,
    name: "Santiago",
    aqi: 85,
    status: "Moderate",
    color: "#FFBB00",
    isFavorite: true,
  },
  notifications: [
    {
      id: 1,
      title: "Alerta de contaminación",
      message:
        "Niveles elevados de PM2.5 en Santiago. Se recomienda evitar actividades al aire libre.",
      time: "2 horas atrás",
      type: "warning",
      read: false,
    },
    {
      id: 2,
      title: "Mejora en la calidad del aire",
      message:
        "La calidad del aire en Valparaíso ha mejorado a niveles saludables.",
      time: "5 horas atrás",
      type: "info",
      read: true,
    },
    {
      id: 3,
      title: "Pronóstico de lluvia",
      message:
        "Se espera lluvia en Concepción, lo que podría mejorar la calidad del aire en las próximas horas.",
      time: "1 día atrás",
      type: "weather",
      read: true,
    },
    {
      id: 4,
      title: "Alerta de contaminación",
      message:
        "Niveles elevados de ozono en Antofagasta. Se recomienda precaución para personas con problemas respiratorios.",
      time: "2 días atrás",
      type: "warning",
      read: true,
    },
  ]
};
export const NOTIFICATIONS = [
  {
    id: 1,
    title: "Alerta de contaminación",
    message:
      "Niveles elevados de PM2.5 en Santiago. Se recomienda evitar actividades al aire libre.",
    time: "2 horas atrás",
    type: "warning",
    read: false,
  },
  {
    id: 2,
    title: "Mejora en la calidad del aire",
    message:
      "La calidad del aire en Valparaíso ha mejorado a niveles saludables.",
    time: "5 horas atrás",
    type: "info",
    read: true,
  },
  {
    id: 3,
    title: "Pronóstico de lluvia",
    message:
      "Se espera lluvia en Concepción, lo que podría mejorar la calidad del aire en las próximas horas.",
    time: "1 día atrás",
    type: "weather",
    read: true,
  },
  {
    id: 4,
    title: "Alerta de contaminación",
    message:
      "Niveles elevados de ozono en Antofagasta. Se recomienda precaución para personas con problemas respiratorios.",
    time: "2 días atrás",
    type: "warning",
    read: true,
  },
];
export const MOCK_FAVORITES = [
  { id: 1, name: "Santiago", aqi: 85, status: "Moderate", color: "#FFBB00" },
  { id: 2, name: "Valparaíso", aqi: 42, status: "Good", color: "#00C853" },
  {
    id: 3,
    name: "Concepción",
    aqi: 120,
    status: "Unhealthy",
    color: "#FF5252",
  },
];
export const REGIONS = [
  { id: 1, name: "Región Metropolitana", aqi: 85, status: "Moderate", color: "#FFBB00", isFavorite: true },
  { id: 2, name: "Valparaíso", aqi: 42, status: "Good", color: "#00C853", isFavorite: true },
  { id: 3, name: "Biobío", aqi: 120, status: "Unhealthy", color: "#FF5252", isFavorite: false },
  { id: 4, name: "Antofagasta", aqi: 65, status: "Moderate", color: "#FFBB00", isFavorite: false },
  { id: 5, name: "Coquimbo", aqi: 35, status: "Good", color: "#00C853", isFavorite: false },
  { id: 6, name: "Los Lagos", aqi: 28, status: "Good", color: "#00C853", isFavorite: false },
  { id: 7, name: "Maule", aqi: 75, status: "Moderate", color: "#FFBB00", isFavorite: false },
  { id: 8, name: "Araucanía", aqi: 110, status: "Unhealthy", color: "#FF5252", isFavorite: false },
  { id: 9, name: "O'Higgins", aqi: 55, status: "Moderate", color: "#FFBB00", isFavorite: false },
  { id: 10, name: "Tarapacá", aqi: 40, status: "Good", color: "#00C853", isFavorite: false },
]