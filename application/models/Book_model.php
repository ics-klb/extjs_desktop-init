<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Class Book_model
 * Модель для работы с книгами
 */
class Book_model extends CI_Model {

	/**
	 * Загрузка списка книг
	 */
	private function getRecord($book_id)
    {

        return $this->db->select('*')
            ->from('book_id')
            ->where('book_id', intval($book_id) );
    }

	public function addList($data)
    {

        $params = array(
            'book_name'   => isset($data['book_name'])   ? $data['book_name'] : '',
            'author_name' => isset($data['author_name']) ? $data['author_name'] : '',
            'book_year'   => isset($data['book_year'])   ? intval($data['book_year']) : 0,
            'status' => 1
        );

        $query =  "INSERT INTO `swan_books` (`book_name`,`author_name`,`book_year`,`status`) "
                    ." VALUES (?, ?, ?, ?);";
        $this->db->query($query, $params);

        return array();
    }

	public function updateList($data)
    {

        if ($data['book_id']> 0) {
            $record = $this->getRecord($data['book_id']);
        }

        if (isset($record['book_id']) && $record['book_id'] > 0 ) {

            $params = array(
                'book_name'   => $data['book_name']  ?? '',
                'author_name' => $data['author_name'] ?? '',
                'book_year'   => isset($data['book_year'])   ? intval($data['book_year']) : 0,
                'book_id'     => $record['book_id']
            );

            $query =  "UPDATE `swan_books`  SET `book_name` = '?',`author_name` = '?',`book_year` = ?  "
                ." WHERE `id` = ? LIMIT 1;";
            $this->db->query($query, $params);
        } else {

            $record = $this->addList($data);
        }

        return $record;
    }

	public function removeList($data)
    {

        if ($data['book_id']> 0) {

            $params = array(
                'book_id' => intval($data['book_id'])
            );

            $query = 'DELETE FROM `swan_books` WHERE `id` = ? LIMIT 1;';
            $this->db->query($query, $params);
        }

        return array('success' => true);
    }

	public function loadList()
	{

	    $data = array(
        );
        return $this->_getLoadData($data);
	}

	protected function _getLoadData($data = array() )
    {
		// todo реализовать получение списка книг из БД
//		return array(
//			array('book_id' => 1, 'book_name' => 'Евгений Онегин', 'author_name' => 'Пушкин А.С.', 'book_year' => 1833),
//			array('book_id' => 2, 'book_name' => 'Война и мир', 'author_name' => 'Толстой Л.Н.', 'book_year' => 1869),
//			array('book_id' => 3, 'book_name' => 'Анна Каренина', 'author_name' => 'Толстой Л.Н.', 'book_year' => 1877)
//		);
        $params = array(
            'book_status' => 1,
            'book_order' => 'book_year'
        );
        $query = "SELECT bn.`id` as book_id, bn.`author_name` as author_name, bn.`book_name` as book_name, bn.`book_year` as book_year "
                ." FROM `swan_books` as bn "
                ." WHERE bn.`status` = ? "
                ." ORDER BY ? LIMIT 0, 100; ";

        $result = $this->db->query($query, $params);
        

		if ( is_object($result) ) {
            return $result->result('array');
        }
        else {
            return array();
        }
    }


    public function exportXml()
    {
        $xml = new SimpleXMLElement('<books/>');

        $data = $this->_getLoadData();

        foreach($data as $item) {
            $books = $xml->addChild('book');
            $books->addAttribute('id', $item["book_id"]);
            $books->addAttribute('name', $item["book_name"]);
            $books->addAttribute('author', $item["author_name"]);
        }

        $dom = new DOMDocument('1.0');
        $dom->preserveWhiteSpace = false;
        $dom->formatOutput = true;
        $dom->loadXML( $xml->asXML());

        return $dom->saveXML();
    }

}
