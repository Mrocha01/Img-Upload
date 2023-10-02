const Picture = require("../models/Picture");

const fs = require("fs");

exports.create = async (req, res) => {
    try {
        const {name} = req.body;

        const file = req.file;

        const picture = new Picture({
            name,
            src: file.path,
        });

        await picture.save();

        res
          .status(200)
          .json({
              picture, msg: "Imagem enviada com sucesso!"
           });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Erro ao salvar imagem' });
    }
};

exports.findAll = async (req, res) => {
    try {
        const pictures = await Picture.find();

        if(pictures.length <= 0) {
            res
              .status(404)
              .json({ msg: "Nenhuma imgem foi encontrada!"});
              return;
        };

        res
        .status(200)
        .json({
            pictures, msg: "Imagens encontradas com sucesso!"
         });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Erro ao buscar imagens' });
    }
};

exports.remove = async(req, res) => {
    try {
        const picture = await Picture.findById(req.params.id);

        if(!picture){
          res
            .status(404)
            .json({ msg: "Nenhuma imgem foi encontrada!" });
              return;
        };

        fs.unlinkSync(picture.src);

        await picture.deleteOne();

        res
        .status(200)
        .json({ msg: "Imagem removida com sucesso!" });        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Erro ao remover imagem' });
    }
};