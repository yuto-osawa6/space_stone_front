// function Page({ data }) {
//   // Render data...
// }

import { product } from "interfaces/product";
import { GetServerSideProps, GetStaticProps } from "next";
import React from "react";

// // This gets called on every request
// const url = "https://api.github.com/repos/zeit/next.js";
// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`https://.../data`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } }
// }

// export default Page

// const Home1:React.FC = () => {
//   return (
//     <div>
//       <h2>
//           POSTの一覧
//         </h2>
//         <table>
//           {props.posts.map((post) =>
//             <tr>
//               <td>{post.id}.</td>
//               <td>{post.title}</td>
//             </tr>
//           )}
//         </table>
//     </div>
//   )
// }

// export const getStaticProps = async () => {
//   // URLはlocalhostではなくapiとなる
//   const res = await fetch("http://api:3000/posts", {method: "GET"});
//   const json = await res.json();

//   return {
//     props: {
//       data: json
//     },
//   };
// }

// export default Home1;

type Props = {
  posts: product[];
}

export const ThisSeasonProduct: React.FC<Props> = (props) => {
  return (
    <div>
      <h2>POSTの一覧</h2>
      <table>
      {/* {props.posts.map((post) =>
        <tr>
          <td>{post.id}.</td>
          <td>{post.title}</td>
        </tr>
      )} */}
      </table>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const res = await fetch("http://api:3000/products/red", {method: "GET"});
  const json = await res.json();
  console.log(json)
  return {
    props: {
      posts: json
    },
  };
}





// export default Home;
