import { api } from "../../services/api";

type ServiceParams = {
  id: string;
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

/**
 * @description busca o livro pelo id
 * */
async function getBookService({
  id: bookId,
}: ServiceParams): Promise<BookResponse> {
  try {
    const response = await api.get<any>(`volumes/${bookId}`);

    const { id } = response.data;

    const {
      title,
      description,
      imageLinks,
      authors: authorsList,
      publishedDate,
      previewLink,
    } = response.data.volumeInfo;
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
  } catch (error) {
    throw new Error(error.message);
  }
}

export default getBookService;
