import React, { createContext, useMemo, useState, useContext } from "react";


type MenuIds = "first" | "second" | "last";
type Menu = { id: MenuIds; title: string };


type SelectedMenu = {
  id: MenuIds;
};


type MenuSelected = {
  selectedMenu?: SelectedMenu;
};

const MenuSelectedContext = createContext<MenuSelected>({});


type MenuAction = {
  onSelectedMenu: (menu: SelectedMenu) => void;
};

const MenuActionContext = createContext<MenuAction | undefined>(undefined);


type PropsProvider = {
  children: React.ReactNode;
};

function MenuProvider({ children }: PropsProvider) {

  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu | undefined>(undefined);

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={{ selectedMenu }}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}


type PropsMenu = {
  menus: Menu[];
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext) || {};
  const selectedMenu = useContext(MenuSelectedContext) || { selectedMenu: undefined };

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu && onSelectedMenu({ id: menu.id })}>
          {menu.title} {selectedMenu.selectedMenu?.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
