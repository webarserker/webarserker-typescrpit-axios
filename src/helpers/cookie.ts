const cookie = {
  read(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')); // 匹配cookie ，名： 值返回
    return match ? decodeURIComponent(match[3]) : null;
  }
};

export default cookie;
