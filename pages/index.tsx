import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

type Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    const [imageUrl, setImageUrl] = useState(initialImageUrl);
    const [loading, setLoading] = useState(false);

    // 非同期処理書けない
    // useEffect(() => {
    //     fetchCatImage().then((newImage) => {
    //         setImageUrl(newImage.url);
    //         setLoading(false);
    //     });
    // }, []);

    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchCatImage();
        setImageUrl(newImage.url);
        setLoading(false);
    };

    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>New cat!</button>
            <div className={styles.frame}>
                {loading || <img src={imageUrl} className={styles.img} />}
            </div>
        </div>
    );
};

export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const initialImage = await fetchCatImage();
    console.log(initialImage);
    return {
        props: {
            initialImageUrl: initialImage.url,
        },
    };
};

type Image = {
    url: string;
};

const fetchCatImage = async (): Promise<Image> => {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await response.json();
    return images[0];
};
