import React, { useMemo } from "react";
import { useRouter } from "next/router";
import SEOConfig from "../../../shared/components/SEO";
import Navigation from "../../../shared/components/Navigation_v2";
import Footer from "../../../shared/components/Footer_v2";
import Resource from "../../../components/Resource";

const ResourcePage = () => {
  const router = useRouter();
  const SEOData = useMemo(
    () => ({
      title: "學習資源平台｜島島阿學",
      description:
        "「島島阿學」盼能透過建立學習資源網絡，讓自主學習者能找到合適的成長方法，進而成為自己想成為的人，並從中培養共好精神。目前正積極打造「可共編的學習資源平台」。",
      keywords: "島島阿學",
      author: "島島阿學",
      copyright: "島島阿學",
      imgLink: "/preview.webp",
      link: `https://test-page.notion.dev.daoedu.tw${router.asPath}`,
    }),
    [router]
  );

  return (
    <>
      <SEOConfig data={SEOData} />
      <Navigation />
      <Resource />
      <Footer />
    </>
  );
};

// stackoverflow.com/questions/62057131/next-js-getstaticpaths-list-every-path-or-only-those-in-the-immediate-vicinity
export const getStaticProps = async () => {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  // const post = await res.json();

  return {
    props: {},
  };
};

export const getStaticPaths = async () => {
  const result = await fetch("https://api.daoedu.tw/notion/databases", {
    method: "POST",
  }).then((res) => res.json());
  const pathList = (result?.payload?.results ?? []).map((item) => ({
    params: {
      title: item?.properties["資源名稱"]?.title[0]?.plain_text,
    },
  }));

  console.log("pathList", pathList);
  return {
    // paths: [{ params: { title: "跨校選修聯盟" } }],
    // fallback: false,
    paths: pathList,
    // paths: [{ params: { title: "test" } }], // indicates that no page needs be created at build time
    fallback: false, // indicates the type of fallback
  };
};

export default ResourcePage;
