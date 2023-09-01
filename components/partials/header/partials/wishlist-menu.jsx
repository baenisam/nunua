import React, { useContext } from "react";
import GlobalContext from "~/context/GlobalContext";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { UserContext } from "~/context/UserContext";

import ALink from "~/components/features/alink";

function WishlistMenu(props) {
  const { wishlist } = props;
  const router = useRouter();
  const { show, open, setOpen, setRedirection } = useContext(GlobalContext);
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);
  const nagigate = () => {
    if (userInfo?.token) {
      router.push("/user/wishlist");
    } else {
      setRedirection("/user/wishlist");
      setOpen(true);
    }
  };

  return (
    <button
      href="#"
      onClick={nagigate}
      className="wishlist-link"
      title="Wishlist"
    >
      <i className="icon-heart-o"></i>
      <span className="wishlist-count badge">{wishlist.length}</span>
      <span className="wishlist-txt">Favoris</span>
    </button>
  );
}

function mapStateToProps(state) {
  return {
    wishlist: state.wishlist.data,
  };
}

export default connect(mapStateToProps, {})(WishlistMenu);
