<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book
 * Контроллер для работы с книгами
 */
class Book extends CI_Controller {

    /**
     * comment
     */
    public function __construct()
    {
        parent::__construct();
        // список типов олей модели
        $this->inputRules['addList'] = [
            [ 'field' => 'book_id', 'label' => 'Идентификатор', 'rules' => 'required', 'type' => 'id' ],
            [ 'field' => 'book_name', 'label' => 'Наименование', 'rules' => '', 'type' => 'text' ],
            [ 'field' => 'author_name', 'label' => 'Автор', 'rules' => '', 'type' => 'text' ],
            [ 'field' => 'book_year', 'label' => 'Год', 'rules' => '', 'type' => 'id' ],
            [ 'field' => 'description', 'label' => 'Год', 'rules' => '', 'type' => 'text' ],
        ];

        $this->inputRules['updateList'] = $this->inputRules['addList'];
        $this->inputRules['removeList'] = $this->inputRules['addList'];

    }

    private function _getInputData() {

        $jsonArray = json_decode($this->input->raw_input_stream, TRUE);
        return $jsonArray;
    }

    public function addList()
    {
        $bookList = array();
        $data = $this->_getInputData();

        $this->load->model('Book_model');

        $bookList = $this->Book_model->addList($data);
        echo json_encode($bookList);
    }

    public function updateList()
    {
        $bookList = array();
        $data = $this->_getInputData();

        $this->load->model('Book_model');

        $bookList = $this->Book_model->updateList($data);
        echo json_encode($bookList);
    }

    public function removeList()
    {
        $bookList = array();
        $data = $this->_getInputData();
        $this->load->model('Book_model');

       if (isset($data['book_id']))
            $bookList = $this->Book_model->removeList(array('book_id' => $data['book_id']));

        echo json_encode($bookList);
    }
	/**
	 * Загрузка списка книг
	 */

	public function loadList()
	{
		$this->load->model('Book_model');

		$bookList = $this->Book_model->loadList();
		echo json_encode($bookList);
	}

    public function exportXml()
    {
        $this->load->model('Book_model');

        header('Content-Type: text/xml');
        return $this->Book_model->exportXml();
    }
}
