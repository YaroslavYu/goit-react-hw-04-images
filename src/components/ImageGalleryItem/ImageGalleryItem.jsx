import { Component, useState } from 'react';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem1 extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { previewURL, largeImageURL, tags } = this.props.image;
    return (
      <GalleryItem>
        <GalleryItemImage
          src={previewURL}
          alt={tags}
          onClick={this.openModal}
        />
        {this.state.isModalOpen && (
          <Modal src={largeImageURL} alt={tags} closeModal={this.closeModal} />
        )}
      </GalleryItem>
    );
  }
}

export const ImageGalleryItem = ({
  image: { previewURL, largeImageURL, tags },
}) => {
  const [isModalOpen, setisModalOpen] = useState(false);

  return (
    <GalleryItem>
      <GalleryItemImage
        src={previewURL}
        alt={tags}
        onClick={() => setisModalOpen(true)}
      />
      {isModalOpen && (
        <Modal
          src={largeImageURL}
          alt={tags}
          closeModal={() => setisModalOpen(false)}
        />
      )}
    </GalleryItem>
  );
};
