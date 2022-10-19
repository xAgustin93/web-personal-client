import React, { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size, map } from "lodash";
import { Menu } from "../../../../api";
import { MenuItem } from "../MenuItem";

const menuController = new Menu();

export function ListMenu(props) {
  const { active, reload, onReload } = props;
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setMenus(null);
        const repsonse = await menuController.getMenu(active);
        setMenus(repsonse);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [active, reload]);

  if (!menus) return <Loader active inline="centered" />;
  if (size(menus) === 0) return "No hay ningun menu";

  return map(menus, (menu) => (
    <MenuItem key={menu._id} menu={menu} onReload={onReload} />
  ));
}
