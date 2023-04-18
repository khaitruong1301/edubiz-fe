import { createSlice } from "@reduxjs/toolkit";
import localStorageServ from "../../services/locaStorage.service";
var fakedata = [
  {
    id: 31,
    noiDung: {
      capDo: 3,
      tieuDe: "Hãy chọn câu đúng. (có thể 1 hoặc nhiều câu đúng)",
      inPut:
        "N&#x1ed9;i dung c&#x1ee7;a mat sau khi ch&#x1ea1;y &dstrok;o&#x1ea1;n code sau l&agrave; g&igrave; &NewLine; &NewLine;int&lbrack;&rbrack;&lbrack;&rbrack; arr &equals; &lbrace; &lbrace; 3&comma; 2&comma; 1 &rbrace;&comma; &lbrace; 1&comma; 2&comma; 3 &rbrace; &rbrace;&semi; &NewLine;int value &equals; 0&semi; &NewLine;for &lpar;int row &equals; 1&semi; row &lt; arr&period;length&semi; row&plus;&plus;&rpar; &lbrace; &NewLine;for &lpar;int col &equals; 1&semi; col &lt; arr&lbrack;0&rbrack;&period;length&semi; col&plus;&plus;&rpar; &lbrace; &NewLine;&Tab;if &lpar;arr&lbrack;row&rbrack;&lbrack;col&rbrack; &percnt; 2 &equals;&equals; 1&rpar; &lbrace; &NewLine;&Tab;&Tab;arr&lbrack;row&rbrack;&lbrack;col&rbrack; &equals; arr&lbrack;row&rbrack;&lbrack;col&rbrack; &plus; 1&semi; &NewLine;&Tab;&rbrace; &NewLine;&Tab;if &lpar;arr&lbrack;row&rbrack;&lbrack;col&rbrack; &percnt; 2 &equals;&equals; 0&rpar; &lbrace; &NewLine;&Tab;&Tab;arr&lbrack;row&rbrack;&lbrack;col&rbrack; &equals; arr&lbrack;row&rbrack;&lbrack;col&rbrack; &ast; 2&semi; &NewLine;&Tab;&rbrace; &NewLine;&rbrace; &NewLine;&rbrace;",
      maLoaiBaiTap: "SINGLE",
      dapAn: [
        {
          cauTraLoi: "{ {6, 4, 2}, {2, 4, 6}}",
          luaChon: false,
        },
        {
          cauTraLoi: "{ {3, 2, 1}, {1, 4, 6}}",
          luaChon: false,
        },
        {
          cauTraLoi: "{ {3, 2, 1}, {1, 4, 8}}",
          luaChon: true,
        },
        {
          cauTraLoi: "{ {3, 2, 1}, {2, 4, 4}}",
          luaChon: false,
        },
      ],
    },
    isCorrect: true,
    userAnsers: [
      {
        id: 2,
        cauTraLoi: "{ {3, 2, 1}, {1, 4, 8}}",
        luaChon: true,
      },
    ],
  },
  {
    id: 46,
    noiDung: {
      capDo: 1,
      tieuDe: "Hãy chọn câu đúng. (có thể 1 hoặc nhiều câu đúng)",
      inPut:
        "public static void main&lpar;String s&lbrack;&rbrack;&rpar; &NewLine;&lbrace; &NewLine; float m &equals; 34&semi; &NewLine; float n &equals; 56&semi; &NewLine; int o &equals; &lpar;int&rpar; sum&lpar;m&comma; n&rpar;&semi; &NewLine; System&period;out&period;println&lpar;&quot;o &equals; &quot; &plus; o&rpar;&semi; &NewLine;&rbrace; &NewLine; &NewLine;public static float sum&lpar;float m&comma; float n&rpar; &NewLine;&lbrace; &NewLine; System&period;out&period;println&lpar;&quot;m &equals; &quot; &plus; m &plus; &quot; n &equals; &quot; &plus; n&rpar;&semi; &NewLine; return m &plus; n&semi; &NewLine;&rbrace;",
      maLoaiBaiTap: "multiple_choice",
      cauTraLoi: [
        {
          ma: 1,
          noiDung: "m = 34.0",
        },
        {
          ma: 2,
          noiDung: "m = 34",
        },
        {
          ma: 3,
          noiDung: "n =56",
        },
        {
          ma: 4,
          noiDung: "n = 56.0",
        },
        {
          ma: 5,
          noiDung: "o = 90",
        },
        {
          ma: 6,
          noiDung: "o = 90.0",
        },
        {
          ma: 7,
          noiDung: "o = 0.0",
        },
        {
          ma: 8,
          noiDung: "Lỗi biên dịch",
        },
      ],
      dapAn: ["1", "4", "5"],
    },
    isCorrect: true,
    userAnsers: [1, 4, 5],
  },
  {
    id: 9,
    noiDung: {
      capDo: 3,
      tieuDe: "Điền vào chỗ trống [?] để ra kết quả như yêu cầu:",
      inPut:
        "  int a&lbrack;&rbrack;&lbrack;&rbrack; &equals; &lbrace; &lbrace; 7&comma; 2 &rbrace;&comma; &lbrace; 3&comma; 1 &rbrace; &rbrace;&semi;&NewLine;&Tab;int b&lbrack;&rbrack; &equals; new int&lbrack;a&lbrack;0&rbrack;&period;length &ast; a&lbrack;1&rbrack;&period;length&rbrack;&semi;&NewLine;&Tab;int k &equals; 0&semi;&NewLine;&Tab;for &lpar;int i &equals; 0&semi; i♥ a&lbrack;♥&rbrack;&period;length&semi; i&plus;&plus;&rpar; &lbrace;&NewLine;&Tab;    for &lpar;int j &equals; 0&semi; j &lt; a&lbrack;♥&rbrack;&period;length&semi; j&plus;&plus;&rpar; &lbrace;&NewLine;&Tab;        b&lbrack;k&plus;&plus;&rbrack; &equals; a&lbrack;i&rbrack;&lbrack;j&rbrack;&semi;&NewLine;&Tab;    &rbrace;&NewLine;&Tab;&rbrace;&NewLine;&Tab;for &lpar;int i &equals; 0&semi; i &lt; b&period;length&semi; i&plus;&plus;&rpar; &lbrace;&NewLine;&Tab;    System&period;out&period;print&lpar;b&lbrack;i&rbrack; &plus; &quot;&bsol;t&quot;&rpar;&semi;&NewLine;&Tab;&rbrace;",
      outPut: " 7        2        3        1",
      maLoaiBaiTap: "fill_inblank",
      cauTraLoi: [
        {
          ma: 1,
          noiDung: "0",
        },
        {
          ma: 2,
          noiDung: "==",
        },
        {
          ma: 3,
          noiDung: ">=",
        },
        {
          ma: 4,
          noiDung: "2",
        },
        {
          ma: 5,
          noiDung: "1",
        },
        {
          ma: 6,
          noiDung: "<",
        },
      ],
      dapAn: ["1", "5", "6"],
    },
    isCorrect: false,
    userAnsers: [1, 4, 5],
  },
  {
    id: 2,
    noiDung: {
      capDo: 1,
      tieuDe: "Điền vào chỗ trống [?] để ra kết quả như yêu cầu:",
      inPut:
        "public static void main&lpar;String&lbrack;&rbrack; args&rpar; &lbrace;&NewLine;    &sol;&sol; TODO Auto-generated method stub&NewLine;    int a&lbrack;&rbrack; &equals; &lbrace; -3&comma; 2&comma; -1&comma; 4&comma; 5&comma; 2&comma; 5 &rbrace;&semi;&NewLine;    System&period;out&period;println&lpar;&quot;K&#x1ebf;t qu&#x1ea3; &colon; &quot; &plus; xoaPhanTuGiaTriAm&lpar;a&rpar;&period;length&rpar;&semi;&NewLine;&rbrace;&NewLine;&NewLine;public static int&lbrack;&rbrack; xoaPhanTuGiaTriAm&lpar;int a&lbrack;&rbrack;&rpar; &lbrace;&NewLine;    int dem &equals; 0&comma; j &equals; 0&semi;&NewLine;    for &lpar;int i &equals; 0&semi; i &lt; a&period;length&semi; i&plus;&plus;&rpar; &lbrace;&NewLine;        if &lpar;a&lbrack;i&rbrack;♥ 0&rpar; &lbrace;&NewLine;            dem&plus;&plus;&semi;&NewLine;        &rbrace;&NewLine;    &rbrace;&NewLine;    int b&lbrack;&rbrack; &equals; new int&lbrack;a&period;length - dem&rbrack;&semi;&NewLine;    for &lpar;int i &equals; 0&semi; i &lt; a&period;length&semi; i&plus;&plus;&rpar; &lbrace;&NewLine;        if &lpar;a&lbrack;i&rbrack;♥ 0&rpar; &lbrace;&NewLine;            b&lbrack;j&plus;&plus;&rbrack; &equals; a&lbrack;i&rbrack;&semi;&NewLine;        &rbrace;&NewLine;    &rbrace;&NewLine;    a &equals; b&semi;&NewLine;    return a&semi;&NewLine;&rbrace;",
      outPut: "5",
      maLoaiBaiTap: "fill_inblank",
      cauTraLoi: [
        {
          ma: 1,
          noiDung: "<",
        },
        {
          ma: 2,
          noiDung: "==",
        },
        {
          ma: 3,
          noiDung: ">=",
        },
        {
          ma: 4,
          noiDung: "<=",
        },
        {
          ma: 5,
          noiDung: ">",
        },
        {
          ma: 6,
          noiDung: "!=",
        },
      ],
      dapAn: ["1", "3"],
    },
    isCorrect: true,
    userAnsers: [1, 3],
  },
  {
    id: 37,
    noiDung: {
      capDo: 2,
      tieuDe: "Kết quả chương trình là gì ? (có thể 1 hoặc nhiều câu đúng).",
      inPut:
        " public class Test &lbrace;&NewLine;&Tab;private int data &equals; 5&semi;&NewLine;&NewLine;&Tab;public int getData&lpar;&rpar; &lbrace;&NewLine;&Tab;&Tab;return this&period;data&semi;&NewLine;&Tab;&rbrace;&NewLine;&NewLine;&Tab;public int getData&lpar;int value&rpar; &lbrace;&NewLine;&Tab;&Tab;return &lpar;data &plus; 1&rpar;&semi;&NewLine;&Tab;&rbrace;&NewLine;&NewLine;&Tab;public int getData&lpar;int&period;&period;&period; value&rpar; &lbrace;&NewLine;&Tab;&Tab;return &lpar;data &plus; 2&rpar;&semi;&NewLine;&Tab;&rbrace;&NewLine;&NewLine;&Tab;public static void main&lpar;String&lbrack;&rbrack; args&rpar; &lbrace;&NewLine;&Tab;&Tab;Test temp &equals; new Test&lpar;&rpar;&semi;&NewLine;&Tab;&Tab;System&period;out&period;println&lpar;temp&period;getData&lpar;7&comma; 8&comma; 12&rpar;&rpar;&semi;&NewLine;&Tab;&rbrace;&NewLine;&rbrace;",
      maLoaiBaiTap: "SINGLE",
      dapAn: [
        {
          cauTraLoi: "Lỗi biên dịch hoặc chạy chương trình",
          luaChon: false,
        },
        {
          cauTraLoi: "8",
          luaChon: false,
        },
        {
          cauTraLoi: "10",
          luaChon: false,
        },
        {
          cauTraLoi: "7",
          luaChon: true,
        },
      ],
    },
    isCorrect: true,
    userAnsers: [
      {
        id: 3,
        cauTraLoi: "7",
        luaChon: true,
      },
    ],
  },
  {
    id: 15,
    noiDung: {
      capDo: 3,
      tieuDe: "Điền vào chỗ trống [?] để được kết quả như bên dưới",
      inPut:
        "public static int timKySoLonNhat&lpar;int max&comma; int n&rpar; &lbrace;&NewLine;    if &lpar;n &sol; 10 &equals;&equals; 0&rpar; &lbrace;&NewLine;        if &lpar;n &gt; max&rpar;&NewLine;            max &equals; n&semi;&NewLine;        return max&semi;&NewLine;    &rbrace; else &lbrace;&NewLine;        if &lpar;n &percnt; 10♥ max&rpar;&NewLine;            max &equals; n♥ 10&semi;&NewLine;        return timKySoLonNhat&lpar;max&comma; n♥ 10&rpar;&semi;&NewLine;    &rbrace;&NewLine;&rbrace;&NewLine;&NewLine;public static void main&lpar;String&lbrack;&rbrack; args&rpar; &lbrace;&NewLine;    System&period;out&period;println&lpar;&quot;K&yacute; s&#x1ed1; l&#x1edb;n nh&#x1ea5;t l&agrave; &colon; &quot; &plus; timKySoLonNhat&lpar;0&comma; 32433&rpar;&rpar;&semi;&NewLine;&rbrace;",
      outPut: "Ký số lớn nhất là : 4",
      maLoaiBaiTap: "fill_inblank",
      cauTraLoi: [
        {
          ma: 1,
          noiDung: ">",
        },
        {
          ma: 2,
          noiDung: "%",
        },
        {
          ma: 3,
          noiDung: ">=",
        },
        {
          ma: 4,
          noiDung: "*",
        },
        {
          ma: 5,
          noiDung: "!=",
        },
        {
          ma: 6,
          noiDung: "/",
        },
        {
          ma: 7,
          noiDung: "==",
        },
      ],
      dapAn: ["1", "2", "6"],
    },
    isCorrect: false,
    userAnsers: [1, 2, 5],
  },
  {
    id: 33,
    noiDung: {
      capDo: 2,
      tieuDe: "Kết quả chương trình là gì ? (có thể 1 hoặc nhiều câu đúng).",
      inPut:
        "public class MyFirst &lbrace;&NewLine;&Tab;public static void main&lpar;String&lbrack;&rbrack; args&rpar; &lbrace;&NewLine;&Tab;&Tab;MyFirst obj &equals; new MyFirst&lpar;n&rpar;&semi;&NewLine;&Tab;&rbrace;&NewLine;&NewLine;&Tab;static int a &equals; 10&semi;&NewLine;&Tab;static int n&semi;&NewLine;&Tab;int b &equals; 5&semi;&NewLine;&Tab;int c&semi;&NewLine;&NewLine;&Tab;public MyFirst&lpar;int m&rpar; &lbrace;&NewLine;&Tab;&Tab;System&period;out&period;println&lpar;a &plus; &quot;&comma; &quot; &plus; b &plus; &quot;&comma; &quot; &plus; c &plus; &quot;&comma; &quot; &plus; n &plus; &quot;&comma; &quot; &plus; m&rpar;&semi;&NewLine;&Tab;&rbrace;&NewLine;&NewLine;&Tab;&sol;&sol; Instance Block&NewLine;&Tab;&lbrace;&NewLine;&Tab;&Tab;b &equals; 30&semi;&NewLine;&Tab;&Tab;n &equals; 20&semi;&NewLine;&Tab;&rbrace;&NewLine;&Tab;&sol;&sol; Static Block&NewLine;&Tab;static &lbrace;&NewLine;&Tab;&Tab;a &equals; 60&semi;&NewLine;&Tab;&rbrace;&NewLine;&rbrace;",
      maLoaiBaiTap: "SINGLE",
      dapAn: [
        {
          cauTraLoi: "10, 5, 0, 20, 0",
          luaChon: false,
        },
        {
          cauTraLoi: "10, 30, 20",
          luaChon: false,
        },
        {
          cauTraLoi: "60, 5, 0, 20",
          luaChon: false,
        },
        {
          cauTraLoi: "60, 30, 0, 20, 0",
          luaChon: true,
        },
      ],
    },
    isCorrect: true,
    userAnsers: [
      {
        id: 3,
        cauTraLoi: "60, 30, 0, 20, 0",
        luaChon: true,
      },
    ],
  },
  {
    id: 35,
    noiDung: {
      capDo: 2,
      tieuDe: "Kết quả chương trình là gì ? (có thể 1 hoặc nhiều câu đúng).",
      inPut:
        "public class Main &lbrace;&NewLine;&Tab;public static void gfg&lpar;String s&rpar; &lbrace;&NewLine;&Tab;&Tab;System&period;out&period;println&lpar;&quot;String&quot;&rpar;&semi;&NewLine;&Tab;&rbrace;&NewLine;&NewLine;&Tab;public static void gfg&lpar;Object o&rpar; &lbrace;&NewLine;&Tab;&Tab;System&period;out&period;println&lpar;&quot;Object&quot;&rpar;&semi;&NewLine;&Tab;&rbrace;&NewLine;&NewLine;&Tab;public static void gfg&lpar;Integer i&rpar; &lbrace;&NewLine;&Tab;&Tab;System&period;out&period;println&lpar;&quot;Integer&quot;&rpar;&semi;&NewLine;&Tab;&rbrace;&NewLine;&NewLine;&Tab;public static void main&lpar;String args&lbrack;&rbrack;&rpar; &lbrace;&NewLine;&Tab;&Tab;gfg&lpar;null&rpar;&semi;&NewLine;&Tab;&rbrace;&NewLine;&rbrace;",
      maLoaiBaiTap: "SINGLE",
      dapAn: [
        {
          cauTraLoi: "Object",
          luaChon: false,
        },
        {
          cauTraLoi: "String",
          luaChon: false,
        },
        {
          cauTraLoi: "Integer",
          luaChon: false,
        },
        {
          cauTraLoi: "Lỗi không chạy được",
          luaChon: true,
        },
      ],
    },
    isCorrect: true,
    userAnsers: [
      {
        id: 3,
        cauTraLoi: "Lỗi không chạy được",
        luaChon: true,
      },
    ],
  },
  {
    id: 40,
    noiDung: {
      capDo: 1,
      tieuDe: "Kết quả chương trình là gì ? (có thể 1 hoặc nhiều câu đúng).",
      inPut:
        "public static void main&lpar;String&lbrack;&rbrack; args&rpar;&lbrace; &NewLine;&Tab;for&lpar;int i &equals; 0&semi; i &lt; 3&semi; i&plus;&plus;&rpar;&lbrace; &NewLine;&Tab;&Tab;for&lpar;int j &equals; 0&semi; j &lt; i&semi; j&plus;&plus;&rpar;&lbrace; &NewLine;&Tab;&Tab;&Tab;System&period;out&period;print&lpar;i &plus; &quot; &quot; &plus; j &plus; &quot;&comma; &quot;&rpar;&semi; &NewLine;&Tab;&Tab;&rbrace; &NewLine;&Tab;&rbrace; &NewLine;&rbrace;",
      maLoaiBaiTap: "SINGLE",
      dapAn: [
        {
          cauTraLoi: "0 0, 0 1, 0 2, 1 0, 1 1, 1 2, 2 0, 2 1, 2 2,",
          luaChon: false,
        },
        {
          cauTraLoi: "1 0, 2 0, 2 1",
          luaChon: true,
        },
        {
          cauTraLoi:
            "0 0, 0 1, 0 2, 0 3, 1 0, 1 1, 1 2, 1 3, 2 0, 2 1, 2 2, 2 3,",
          luaChon: false,
        },
        {
          cauTraLoi: "Không có câu đúng",
          luaChon: false,
        },
      ],
    },
    isCorrect: true,
    userAnsers: [
      {
        id: 1,
        cauTraLoi: "1 0, 2 0, 2 1",
        luaChon: true,
      },
    ],
  },
  {
    id: 30,
    noiDung: {
      capDo: 1,
      tieuDe: "Hãy chọn câu đúng. (có thể 1 hoặc nhiều câu đúng)",
      inPut:
        "L&agrave;m th&#x1ebf; n&agrave;o &dstrok;&#x1ec3; l&#x1ea5;y ra gi&aacute; tr&#x1ecb; 6 trong m&#x1ea3;ng a sau &NewLine;int&lbrack;&rbrack;&lbrack;&rbrack; a &equals; &lbrace; &lbrace;2&comma; 4&comma; 6&comma; 8&rbrace;&comma; &lbrace;1&comma; 2&comma; 3&comma; 4&rbrace;&rbrace;&semi;",
      maLoaiBaiTap: "SINGLE",
      dapAn: [
        {
          cauTraLoi: "a[0][3]",
          luaChon: false,
        },
        {
          cauTraLoi: "a[1][3]",
          luaChon: false,
        },
        {
          cauTraLoi: "a[0][2]",
          luaChon: true,
        },
        {
          cauTraLoi: "a[3][1]",
          luaChon: false,
        },
      ],
    },
    isCorrect: true,
    userAnsers: [
      {
        id: 2,
        cauTraLoi: "a[0][2]",
        luaChon: true,
      },
    ],
  },
  {
    id: 29,
    noiDung: {
      capDo: 1,
      tieuDe: "Hãy chọn câu đúng. (có thể 1 hoặc nhiều câu đúng)",
      inPut:
        "public static void main&lpar;String s&lbrack;&rbrack;&rpar; &NewLine;&lbrace; &NewLine; int a &equals; 12 &plus; 21 &ast; 3 - 9 &sol; 2&semi; &NewLine; int b &equals; 14 - 32 &ast; 4 &plus; 175 &sol; 8 - 3&semi; &NewLine; &NewLine; if&lpar;&plus;&plus;a &gt; 71 &amp;&amp; --b &lt; 20&rpar; &NewLine; &lbrace; &NewLine; System&period;out&period;println&lpar;&quot;a &equals; &quot; &plus; a &plus; &quot; b &equals; &quot; &plus; b&rpar;&semi; &NewLine; &rbrace; &NewLine; &NewLine; if&lpar;b-- &equals;&equals; -97 &verbar;&verbar; a-- &lt; 100&rpar; &NewLine; &lbrace; &NewLine; System&period;out&period;println&lpar;&quot;a &equals; &quot; &plus; a &plus; &quot; b &equals; &quot; &plus; b&rpar;&semi; &NewLine; &rbrace; &NewLine;&rbrace;",
      maLoaiBaiTap: "SINGLE",
      dapAn: [
        {
          cauTraLoi: "a = 72 b = -97; a = 71 b = -98",
          luaChon: false,
        },
        {
          cauTraLoi: "a = 72 b = -98",
          luaChon: false,
        },
        {
          cauTraLoi: "a = 72 b = -97; a = 72 b = -98",
          luaChon: true,
        },
        {
          cauTraLoi: "Lỗi biên dịch",
          luaChon: false,
        },
      ],
    },
    isCorrect: true,
    userAnsers: [
      {
        id: 2,
        cauTraLoi: "a = 72 b = -97; a = 72 b = -98",
        luaChon: true,
      },
    ],
  },
  {
    id: 19,
    noiDung: {
      capDo: 2,
      tieuDe: "Điền vào chỗ trống [?] để được kết quả như bên dưới",
      inPut:
        "public static float tinhTongCacPhanSo&lpar;int n&rpar; &lbrace;&NewLine;    if &lpar;n♥ 0&rpar;&NewLine;        return 1&semi;&NewLine;    return &lpar;float&rpar; 1 &sol; &lpar;2♥ n &plus; 1&rpar; &plus; tinhTongCacPhanSo&lpar;n - 1&rpar;&semi;&NewLine;&rbrace;&NewLine;&NewLine;public static void main&lpar;String&lbrack;&rbrack; args&rpar; &lbrace;&NewLine;    System&period;out&period;println&lpar;&quot;T&#x1ed5;ng c&aacute;c s&#x1ed1; l&agrave; &colon; &quot; &plus; tinhTongCacPhanSo&lpar;5&rpar;&rpar;&semi;&NewLine;&NewLine;&rbrace;",
      outPut: "Tổng các số là : 1.8782109",
      maLoaiBaiTap: "fill_inblank",
      cauTraLoi: [
        {
          ma: 1,
          noiDung: ">",
        },
        {
          ma: 2,
          noiDung: "%",
        },
        {
          ma: 3,
          noiDung: ">=",
        },
        {
          ma: 4,
          noiDung: "*",
        },
        {
          ma: 5,
          noiDung: "!=",
        },
        {
          ma: 6,
          noiDung: "/",
        },
        {
          ma: 7,
          noiDung: "==",
        },
      ],
      dapAn: ["4", "7"],
    },
    isCorrect: true,
    userAnsers: [4, 7],
  },
  {
    id: 34,
    noiDung: {
      capDo: 2,
      tieuDe: "Kết quả chương trình là gì ? (có thể 1 hoặc nhiều câu đúng).",
      inPut:
        "import java&period;util&period;&ast;&semi;&NewLine;public class I &lbrace;&NewLine;&Tab;public static void main &lpar;String&lbrack;&rbrack; args&rpar; &NewLine; &lbrace;&NewLine; Object i &equals; new ArrayList&lpar;&rpar;&period;iterator&lpar;&rpar;&semi; &NewLine; System&period;out&period;print&lpar;&lpar;i instanceof List&rpar; &plus; &quot;&comma; &quot;&rpar;&semi; &NewLine; System&period;out&period;print&lpar;&lpar;i instanceof Iterator&rpar; &plus; &quot;&comma; &quot;&rpar;&semi; &NewLine; System&period;out&period;print&lpar;i instanceof ListIterator&rpar;&semi; &NewLine; &rbrace; &NewLine;&rbrace;",
      maLoaiBaiTap: "SINGLE",
      dapAn: [
        {
          cauTraLoi: "false, true, true",
          luaChon: false,
        },
        {
          cauTraLoi: "true, true, false",
          luaChon: false,
        },
        {
          cauTraLoi: "false, true, false",
          luaChon: true,
        },
        {
          cauTraLoi: "false, false, false",
          luaChon: false,
        },
      ],
    },
    isCorrect: true,
    userAnsers: [
      {
        id: 2,
        cauTraLoi: "false, true, false",
        luaChon: true,
      },
    ],
  },
  {
    id: 26,
    noiDung: {
      capDo: 1,
      tieuDe: "Hãy chọn câu đúng. (có thể 1 hoặc nhiều câu đúng)",
      inPut:
        "public static void main&lpar;String&lbrack;&rbrack; args&rpar;&lbrace; &NewLine; &NewLine; String state &equals; &quot;on&quot;&semi; &NewLine; &NewLine; if&lpar;state &equals; &quot;on&quot;&rpar; &NewLine; System&period;out&period;println&lpar;&quot;On&quot;&rpar;&semi; &NewLine; else &NewLine; System&period;out&period;println&lpar;&quot;Off&quot;&rpar;&semi; &NewLine; &NewLine; &rbrace;",
      maLoaiBaiTap: "SINGLE",
      dapAn: [
        {
          cauTraLoi: "On",
          luaChon: false,
        },
        {
          cauTraLoi: "Off",
          luaChon: false,
        },
        {
          cauTraLoi: "Compilation error",
          luaChon: true,
        },
        {
          cauTraLoi: "Runtime error",
          luaChon: false,
        },
      ],
    },
    isCorrect: true,
    userAnsers: [
      {
        id: 2,
        cauTraLoi: "Compilation error",
        luaChon: true,
      },
    ],
  },
  {
    id: 25,
    noiDung: {
      capDo: 1,
      tieuDe: "Điền vào chỗ trống để được kết quả như bên dưới",
      inPut:
        "public static void main&lpar;String s&lbrack;&rbrack;&rpar; &NewLine;&lbrace; &NewLine; int x &equals; 6&semi; &NewLine; int y &equals; 3&semi; &NewLine; int z &equals; 12&semi; &NewLine; &NewLine; int w &equals; method1&lpar;x&comma; y&comma; z&rpar;&semi; &NewLine; System&period;out&period;println&lpar;&quot;w &equals; &quot; &plus; w&rpar;&semi; &NewLine;&rbrace; &NewLine; &NewLine;public static ♥ method1&lpar;int y&comma; int z&comma; int x&rpar; &NewLine;&lbrace; &NewLine; return &lpar;x &ast; z&rpar; &sol; y&semi; &NewLine;&rbrace;",
      outPut: "w = 6",
      maLoaiBaiTap: "fill_input",
      dapAn: ["int"],
    },
    isCorrect: true,
    userAnsers: ["int"],
  },
];
const initialState = {
  userInfor: {
    email: "  string",
    hoTen: "  string",
    soDT: "  string",
    maLoTrinh: "  [ int , int ]",
    avatar: "  string",
    urls: "  string",
    thongTinMoRong: {
      namSinh: "  string",
      soCmnd: "  string",
      hinhCmnd: [],
      congViecHienTai: "  string",
      noiCongTacHienTai: "  string",
      nguonGioiThieu: "  string",
      facebookUrl: "  string",
      luongMongMuon: "  int",
      dongYHoTroTimViec: false,
      predictiveIndexRequire: ["string", "string"],
      predictiveIndex: ["string", "string"],
    },
    maGioiThieu: "",
    linkNopBai: "",
  },
  currentStep: 0,
  isShowModal: false,
  listCMND: [],
  loading: false,
  listCauHoi: [],
  // listCauHoi: fakedata,
};

export const SignUpSlice = createSlice({
  name: "signUpReducer",
  initialState,
  reducers: {
    setUserInfor: (state, action) => {
      state.userInfor = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setImgCMND: (state, action) => {
      state.listCMND = action.payload;
    },
    setLoadingSigup: (state, action) => {
      state.loading = action.payload;
    },
    setListCauHoiDauVao: (state, action) => {
      state.listCauHoi = action.payload;
    },
  },
});
export const {
  setSignUp,
  setCurrentStep,
  setUserInfor,
  setLoadingSigup,
  setListCauHoiDauVao,
} = SignUpSlice.actions;
export default SignUpSlice.reducer;
