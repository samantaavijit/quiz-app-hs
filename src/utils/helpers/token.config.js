export const config = () => {
  return {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
};

export const adminConfig = () => {
  return {
    headers: {
      authorization: `Bearer ${localStorage.getItem("admin_token")}`,
    },
  };
};
