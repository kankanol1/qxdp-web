/**
 * Created by lidianzhong on 2020-06-30.
 * E-mail: lidianzhong@gl-data.com.
 * To: More pain, more gain.
 */
import React, {useState} from 'react'
import {Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';


const AvatarCom = props => {
  const {changeFile} = props;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [file, setFile] = useState(undefined);
  const  getBase64=(img, callback)=> {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const  beforeUpload=(file) =>{
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    // return isJpgOrPng && isLt2M;
    getBase64(file, imageUrl => {
      file.base64= imageUrl;
      changeFile(file);
      setLoading(false);
      setImageUrl(imageUrl);
    });
    return false;
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined/> : <PlusOutlined/>}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={(info) => beforeUpload(info)}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{width: '100%'}}/> : uploadButton}
    </Upload>
  );
}

export default AvatarCom;
