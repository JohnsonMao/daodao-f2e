import React, { useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { Button, Paper, Box, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadRelatedResources } from "../../../redux/actions/resource";
import Card from "./Card";
import Marquee from "react-fast-marquee";

const RelatedResourcesWrapper = styled.div`
  margin: 20px 0;
  h2 {
    font-size: 20px;
    font-weight: 500;
  }
`;

const CardListWrapper = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-x: scroll;
  scroll-behavior: smooth;
  margin-top: 15px;
`;

const CardWrapper = styled.li`
  position: relative;
  width: 200px;
  height: 100px;
  flex: 0 0 200px;
  border-radius: 20px;
  margin: 5px;
  padding: 5px;
  color: #16b9b3;
  border: 2px #16b9b3 solid;
  overflow: hidden;

  cursor: pointer;
  object-fit: cover;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.4s;
  }
`;

const ImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f5f5f5;
  ${({ image }) => css`
    background-image: ${`url(${image})`};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  `}
  border-radius: 20%;
  /* object-fit: cover; */
  /* opacity: 0; */

  @media (max-width: 767px) {
    border-radius: 10%;
  }
`;

const RelatedResources = ({ catName = "運動/心理/醫學" }) => {
    const { relatedResources, isLoading } = useSelector((state) => state?.resource);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
        const scheme = {
            filter: {
            and: [
                {
                or: [
                    {
                    property: "領域名稱",
                    multi_select: {
                        contains: catName,
                    },
                    },
                ],
                },
            ],
            },
            page_size: 10,
        };
        dispatch(loadRelatedResources(scheme));
        }
    }, [catName, dispatch, router.isReady]);

    return (
      <RelatedResourcesWrapper>
        <h2>📌 你可能感興趣的資源</h2>
        <Marquee
          gradientWidth={20}
          delay={3}
          pauseOnHover
            >
            <CardListWrapper>
            {relatedResources.map(({ created_time, properties }) => (
                <Card
                key={created_time}
                image={
                    (Array.isArray(properties["縮圖"]?.files) &&
                    properties["縮圖"]?.files[0]?.name) ??
                    "https://www.daoedu.tw/preview.webp"
                }
                title={(properties["資源名稱"]?.title[0]?.plain_text ?? "").trim()}
                desc={
                    ((properties["介紹"]?.rich_text ?? []).find(
                    (item) => item?.type === "text"
                    )?.plain_text ?? "").slice(0, 40)
                }
                />
            ))}
            </CardListWrapper>  
        </Marquee>
      </RelatedResourcesWrapper>
    );
};

export default RelatedResources;
