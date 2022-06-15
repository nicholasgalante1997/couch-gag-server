export type ResponseBody = {
  meta: MarkdownMeta;
  content: string;
};

export type MarkdownMeta = {
  title: string;
  subtitle: string;
  author?: string;
  img: string;
  genres?: string[];
  readonly episodeKey: string;
  readonly seasonKey: string;
  readonly key: string;
};

export type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'bright';
export type LogColorMapType = {
  [k in LogLevel]: (s: string) => string;
};
