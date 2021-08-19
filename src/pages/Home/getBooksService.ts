import { api } from "../../services/api";

type ServiceParams = {
  searchParams: string;
  page: number;
};

export interface BookResponse {
  id: string;
  title: string;
  description: string;
  imageLinks?: {
    small: string;
    smallThumbnail: string;
    thumbnail: string;
    medium: string;
    large: string;
    extraLarge: string;
  };
  authors: string;
  publishedDate: string;
  previewLink: string;
}

export interface BookData {
  totalItems: number;
  books: BookResponse[];
}

/**
 * @description busca os livros na api do google
 * */
async function getBooks({
  searchParams,
  page,
}: ServiceParams): Promise<BookData> {
  let sum = 1;
  if(page!==1){
    sum = 10*page;
  }
  try {
    const response = await api.get(
      `volumes?q=${searchParams}&maxResults=10&startIndex=${page-1+sum}`
    );

    const { items, totalItems } = response.data;

    return {
      totalItems,
      books: items?.map((book: any) => {
        const { id } = book;
        const {
          title,
          description,
          imageLinks,
          authors: authorsList,
          publishedDate,
          previewLink,
        } = book.volumeInfo;
        const authors = authorsList?.join(" & ");
        return {
          id,
          title,
          description,
          imageLinks,
          authors,
          publishedDate,
          previewLink,
        };
      }),
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export default getBooks;
