import { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import { Helmet, HelmetProvider } from "react-helmet-async";
import PostTable from "./PostTable";
import PostModal from "./PostModal";
import PostService from "../../services/post.service";
import PostTagService from "../../services/postTag.service";
import { Link } from "react-router-dom";

const TITLE = "Quản Lý Bài Viết";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [post, setPost] = useState({});
  const [show, setShow] = useState(false);
  const [action, setAction] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    setSearchData(e);
  };

  const handleShow = async (action, show, id) => {
    const data = id ? await getPost(id) : {};
    setPost(data);
    setAction(action);
    setShow(show);
  };

  const getPosts = () => {
    PostService.search({ searchData: searchData })
      .then((res) => {
        setPosts(res.data.posts);
        setTags(res.data.tags);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPost = async (id) => {
    const data = await PostService.getById(id);
    return data.data;
  };

  const createPostTag = (postTag) => {
    PostTagService.create(postTag)
      .then((res) => {
        post.tags = [res.data, ...post.tags];
        setPost(post);
        setIsLoading(false);
        // setShow(false);
        toast.success(TOAST_MESSAGE.success.create, configToast);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message, configToast);
      });
  };

  const deletePost = (id) => {
    let confirm = window.confirm("Bạn có chắc chắn xóa không?");
    if (confirm) {
      PostService.remove(id)
        .then((res) => {
          setPosts(posts.filter((post) => post._id !== id));
          toast.success(TOAST_MESSAGE.success.delete, configToast);
        })
        .catch((err) => {
          toast.error(TOAST_MESSAGE.error.delete, configToast);
        });
    }
  };

  const deletePostTag = (id) => {
    let confirm = window.confirm("Bạn có chắc chắn xóa không?");
    if (confirm) {
      PostTagService.remove(id)
        .then((res) => {
          const tags = post.tags.filter((tag) => tag._id !== res.data._id);
          setPost({ ...post, tags: tags });

          toast.success(TOAST_MESSAGE.success.delete, configToast);
        })
        .catch((err) => {
          toast.error(TOAST_MESSAGE.error.delete, configToast);
        });
    }
  };

  useEffect(() => {
    getPosts();
  }, [searchData]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charset="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>{TITLE + " / Fragile - Blog, News and Magazine"}</title>
        </Helmet>
      </HelmetProvider>

      <PostModal
        show={show}
        onClose={() => setShow(false)}
        action={action}
        post={post}
        tags={tags}
        createPostTag={createPostTag}
        deletePostTag={deletePostTag}
        isLoading={isLoading}
        setIsLoading={(state) => setIsLoading(state)}
      />
      <h2 className="intro-y text-lg font-medium mt-10">Bài viết</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <Link to={"/post/add"} className="btn btn-primary shadow-md mr-2">
            Thêm bài viết
          </Link>

          <div className="hidden md:block mx-auto text-slate-500">
            Hiển thị {PAGE_SIZE} / {posts.length} bài viết
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Tìm kiếm..."
                value={searchData}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <i className="uil uil-search w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"></i>
            </div>
          </div>
        </div>
        {/* <!-- BEGIN: Data List --> */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <PostTable
            posts={posts}
            deletePost={deletePost}
            handleShow={handleShow}
          />
        </div>
      </div>
    </>
  );
};

export default Post;
