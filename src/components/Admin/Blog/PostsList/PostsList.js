import React from "react";
import { List, Button, Icon, Modal, notification } from "antd";
import { Link } from "react-router-dom";
import { getAccessTokenApi } from "../../../../api/auth";
import { deletePostApi } from "../../../../api/post";

import "./PostsList.scss";

const { confirm } = Modal;

export default function PostsList(props) {
  const { posts, setReloadPosts, editPost } = props;

  const deletePost = post => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando post",
      content: `¿Estas segurod de eliminar el post ${post.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePostApi(accessToken, post._id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadPosts(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor."
            });
          });
      }
    });
  };

  return (
    <div className="posts-list">
      <List
        dataSource={posts.docs}
        renderItem={post => (
          <Post post={post} deletePost={deletePost} editPost={editPost} />
        )}
      />
    </div>
  );
}

function Post(props) {
  const { post, deletePost, editPost } = props;

  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.url}`} target="_blank">
          <Button type="primary">
            <Icon type="eye" />
          </Button>
        </Link>,
        <Button type="primary" onClick={() => editPost(post)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => deletePost(post)}>
          <Icon type="delete" />
        </Button>
      ]}
    >
      <List.Item.Meta title={post.title} />
    </List.Item>
  );
}
