interface Image{
    url: string
}

export interface PostInterface {
    id: string;
    title: string;
    description: string;
    link:string
    image:Image
    app: string[];
  }