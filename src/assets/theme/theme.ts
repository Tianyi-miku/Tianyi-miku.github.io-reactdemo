
/**
 * 公用样式
 */
const theme = {
    color: {
        primary: "#C20C0C",
        secondary: ""
    },
    size: {},
    mixin: {
        wrap: `
        width: 1100px;
        margin: 0 auto;
      `,
        textNowrap: `
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      `,
        backColor: `
        color:#ff6700;
      `,
        // 禁止图片 文字 选中
        default_select: `
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        -khtml-user-select: none;
         user-select: none;
      ` 
    }
}

export default theme
