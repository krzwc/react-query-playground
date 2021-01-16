export type Headers = Record<string, string>;

export interface RequestParameters extends RequestInit {
    url: string | URL;
}
