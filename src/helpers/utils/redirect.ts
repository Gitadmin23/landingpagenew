export async function getServerSideProps(url: string) {
    return {
        redirect: {
            destination: url,
            permanent: false, // or true if it's a permanent redirect (301)
        },
    };
}