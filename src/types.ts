export type ResponseBody = {
    meta: MarkdownMeta;
    content: string;
};

export type MarkdownMeta = {
    title: string;
    subtitle: string;
    author?: string;
    genres?: string[];
    readonly episodeKey: string;
    readonly seasonKey: string;
    readonly key: string;
};
