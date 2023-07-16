export declare type SideNodeType = {
    text?: string;
    icon?: string[];
    children?: SideNodeType[];
    [k: string]: any;
};
export declare type SideNavProps = {
    menuList: SideNodeType[];
    activeKey: string;
    mini: boolean;
    search: boolean;
    keyField: keyof SideNodeType;
};
export declare type SideNodeProps = {
    node: SideNodeType;
    mini: boolean;
    activeKey: string;
    selectHandler: Function;
    keyField: keyof SideNodeType;
};
export declare type SideNodeEmits = {
    select: [node: SideNodeType];
};
