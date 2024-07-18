export interface Experience {
    role: string;
    organisation: string;
    duration: Duration;
    description: string[];
    logo: string;
}

export interface Duration {
    begin: string;
    end: string;
}