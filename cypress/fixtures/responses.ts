import { userCount } from '../support/utils';

export const generatePaginationResponse = (
  size: number,
  totalElements: number
) => {
  const totalPages = Math.ceil(totalElements / size);
  return {
    statusCode: 200,
    body: {
      _embedded: {
        userResponseList: userCount(size),
      },
      _links: {
        self: {
          href: `https://api.votify.app/general/v1/users/search?page=0&size=${size}&sort=createDate,desc`,
        },
      },
      sort: [
        {
          property: 'createDate',
          direction: 'DESC',
        },
      ],
      page: {
        size,
        totalElements,
        totalPages,
        number: 0,
      },
    },
  };
};
