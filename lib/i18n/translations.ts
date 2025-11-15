export const translations = {
  en: {
    title: "Tier List Maker",
    description: "Upload images, drag them to tiers, and export your tier list",
    addImages: "Add Images",
    export: "Export Image",
    clearAll: "Clear All",
    unassignedTitle: "Unassigned Images",
    unassignedPlaceholder:
      'Click "Add Images" above to start creating your tier list',
    blog: "Blog",
    tierLabels: {
      S: "S",
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
  },
  ja: {
    title: "ティアリストメーカー",
    description:
      "画像をアップロードし、ティアにドラッグして、ティアリストをエクスポート",
    addImages: "画像を追加",
    export: "画像をエクスポート",
    clearAll: "すべてクリア",
    unassignedTitle: "未分類の画像",
    unassignedPlaceholder:
      "上の「画像を追加」をクリックしてティアリストの作成を開始",
    blog: "ブログ",
    tierLabels: {
      S: "S",
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
  },
  ru: {
    title: "Создатель Тир-Листа",
    description:
      "Загружайте изображения, перетаскивайте их в уровни и экспортируйте свой тир-лист",
    addImages: "Добавить изображения",
    export: "Экспортировать изображение",
    clearAll: "Очистить все",
    unassignedTitle: "Неназначенные изображения",
    unassignedPlaceholder:
      "Нажмите «Добавить изображения» выше, чтобы начать создание тир-листа",
    blog: "Блог",
    tierLabels: {
      S: "S",
      A: "A",
      B: "B",
      C: "C",
      D: "D",
    },
  },
} as const;

export type Locale = keyof typeof translations;
export const locales: Locale[] = ["en", "ja", "ru"];
export const defaultLocale: Locale = "en";
