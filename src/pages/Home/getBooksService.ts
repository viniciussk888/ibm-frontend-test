import { api } from "../../services/api";

type ServiceParams = {
  searchParams: string;
  indexPagination: number;
};

export interface BookResponse {
  id: string;
  title: string;
  description: string;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  authors: string;
}

export interface BookData {
  totalItems: number;
  books: BookResponse[];
}

/**
 * @description busca os lvros na api do google
 * */
async function getBooks({
  searchParams,
  indexPagination,
}: ServiceParams): Promise<BookData> {
  try {
    const response = await api.get(
      `volumes?q=${searchParams}&maxResults=20&startIndex=${indexPagination}`
    );

    console.warn(response.data);

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
        } = book.volumeInfo;
        const authors = authorsList?.join(" & ");
        return { id, title, description, imageLinks, authors };
      }),
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

export default getBooks;
