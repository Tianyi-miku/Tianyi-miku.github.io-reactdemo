import styled from "styled-components"

export const HomeSty = styled.div`
    height: 100vh;
    .header {
        display: flex;
        align-items: center;
        .logo {
            width: 300px;
            display:flex;
            justify-content: center;
            ${(props) => props.theme.mixin.backColor}
        }

        .right_con {
            display: flex;
            background: #d0cdcd;
            justify-content: space-between;
            flex: 1;
            > .menu {
                background: #d0cdcd;
                :where(.css-dev-only-do-not-override-1vtf12y).ant-menu-light.ant-menu-horizontal
                    > .ant-menu-item-selected {
                    width: 200px;
                }
                :where(.css-dev-only-do-not-override-1vtf12y).ant-menu-light.ant-menu-horizontal > .ant-menu-item {
                    text-align: center;
                    width: 200px;
                }
            }
            .login {
               margin-right: 40px;
               display: flex;
               align-items: center;
            }
        }
    }
    .content {
        background: red;
    }
`
