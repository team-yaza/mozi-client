import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      black: string;
      light_black: string;
      white: string;
      text: string;
      sidebar: string;
      sidebar_text: string;
      sidebar_text_focused: string;
      sidebar_right_border: string;
      sidebar_line: string;
      sidebar_arrow_icon: string;
      sidebar_menu_background: string;
      recent_search_background: string;
      recent_search_button: string;
      logbook_background: string;
      todo_background: string;
      todo_checkbox: string;
      todolistitem_box_shadow: string;
      background: string;
      purple: string;
      header: string;
      footer: string;
      footer_stroke: string;
      footer_border_top: string;
      grey: string;
      light_grey: string;
    };
    fonts?: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
      body: string;
      subtitle1: string;
      caption1: string;
      caption2: string;
      btn1: string;
      btn2: string;
    };
  }
}
