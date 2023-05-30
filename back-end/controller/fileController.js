exports.uploadFile = async (req, res) => {
    const filename = req.params.filename;
    try {
      const downloadStream = bucket.openDownloadStreamByName(filename);
      const writeStream = fs.createWriteStream(`../${filename}`);

      downloadStream.pipe(writeStream);

      downloadStream.on("end", () => {
        console.log("Tập tin đã được tải xuống thành công!");
        res.status(200).send("Tập tin đã được tải xuống thành công!");
      });

      downloadStream.on("error", (error) => {
        console.error("Lỗi khi tải xuống tập tin:", error);
      });
    } catch (error) {
      console.log(error);
    }
}