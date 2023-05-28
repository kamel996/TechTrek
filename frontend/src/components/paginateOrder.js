import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginateOrders = ({ page, pages, isadmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((item) => (
          <LinkContainer
            key={item + 1}
            isadmin={isadmin}
            to={
              !isadmin
                ? keyword
                  ? `/search/${keyword}/page/${item + 1}`
                  : `/page/${item + 1}`
                : `/admin/orderlist/${item + 1}`
            }
          >
            <Pagination.Item active={item + 1 === page}>
              {item + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default PaginateOrders;
