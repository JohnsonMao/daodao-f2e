import React, { useCallback } from "react";
import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import { useRouter } from "next/router";
import { COLOR_TABLE } from "../../../constants/notion";

const ListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`;

const CATEGORIES = [
  {
    key: "language",
    value: "語言與文學",
  },
  {
    key: "math",
    value: "數學與邏輯",
  },
  {
    key: "comsci",
    value: "資訊與工程",
  },
  {
    key: "humanity",
    value: "人文社會",
  },
  {
    key: "natusci",
    value: "自然科學",
  },
  {
    key: "art",
    value: "藝術",
  },
  {
    key: "education",
    value: "教育",
  },
  {
    key: "life",
    value: "生活",
  },
  {
    key: "health",
    value: "運動/心理/醫學",
  },
  {
    key: "business",
    value: "商業與社會創新",
  },
  {
    key: "multires",
    value: "綜合型學習資源",
  },
];

const SelectedCategory = () => {
  const { push, query } = useRouter();
  const onClickCategory = useCallback(
    (event) => {
      const targetQuery = event.target.textContent;
      const isSelected = (query?.cats ?? "").includes(targetQuery);
      const result = (query?.cats ?? "")
        .split(",")
        .filter((val) => val !== targetQuery)
        .filter((val) => val !== "");
      if (isSelected) {
        // 取消選取可能會清空
        if (result.length > 0) {
          push({
            pathname: "/search",
            query: {
              ...query,
              cats: result.join(","),
            },
          });
        } else {
          delete query.cats;
          push({
            pathname: "/search",
            query,
          });
        }
      } else if (result.length > 0) {
        push({
          pathname: "/search",
          query: {
            ...query,
            cats: [
              ...new Set(
                (query?.cats ?? "").split(",").length > 0
                  ? [...(query?.cats ?? "").split(","), targetQuery]
                  : [targetQuery]
              ),
            ].join(","),
          },
        });
      } else {
        push({
          pathname: "/search",
          query: {
            ...query,
            cats: targetQuery,
          },
        });
      }
    },
    [query]
  );

  return (
    <ListWrapper>
      {CATEGORIES.map(({ key, value }) => (
        <Chip
          key={key}
          label={value}
          value={value}
          onClick={onClickCategory}
          sx={{
            backgroundColor: (query?.cats ?? "").includes(value)
              ? COLOR_TABLE.green
              : COLOR_TABLE.default,
            opacity: (query?.cats ?? "").includes(value) ? "100%" : "40%",
            cursor: "pointer",
            margin: "5px",
            whiteSpace: "nowrap",
            fontWeight: 500,
            fontSize: "16px",
            "&:hover": {
              opacity: "100%",
              transition: "transform 0.4s",
            },
          }}
        />
      ))}
    </ListWrapper>
  );
};

export default SelectedCategory;
