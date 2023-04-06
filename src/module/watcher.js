const fileCheck = (_path) => {
  const p1 = _path.replace(/\\/g, "/");
  const p2 = p1.substring(p1.lastIndexOf("/"), p1.length);
  const p3 = p2.replace(/\//gi, "\r\n");
  const fileName = p3.trim().replace(/(.html|.js)$/, "");
  const fileExt = p3.substring(p3.lastIndexOf(".") + 1, p3.length);
  return {
    name: fileName,
    ext: fileExt,
  };
};

module.exports = fileCheck;
