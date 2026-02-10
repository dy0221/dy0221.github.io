---
title: '지뢰찾기 프로젝트 2'
date: 2024-03-26
permalink: /posts/minesweeper/2/
tags:
  - Project
  - Minesweeper
  - kr

excerpt: ""
parent_category: Project
category: Minesweeper
lang: kr
slug_id: Minesweeper/2
---
  
### Cell, linked list 만들기
cell 같은 경우는 게임 map에 존재하는 각 칸의 데이터를 담는 기능을 한다. cell에는 그 칸에 위치와 지뢰의 유무 등 게임에 필요한 정보가 담겨 있다.  
  
``` cpp
class Cell
{
private:
	int row; int column;
	int neighbor_mines_count;
	bool has_mine = false;
	bool opened = false;
	bool flagged = false;
public:
 
 ......
```
  
linked list란 노드라는 데이터를 담고 있는 가장 작은 단위가 연결되어 있는 형태이다. 노드의 경우 data의 접근을 위해
  
data를 public으로 선언했다.  
``` cpp
class Node
{
private:
    Node* prev;
    Node* next;
public:
    CELL::Cell* data;
    Node(CELL::Cell* val) : data(val), prev(nullptr), next(nullptr) {}
    Node* GetPrev() { return prev; }
    Node* GetNext() { return next; }
    void SetPrev(Node* p) { prev = p; }
    void SetNext(Node* n) { next = n; }
    void Display() const { data->ShowMember(); }
};
```
  
Doubly linked list의 형태로 만들었는데, Node class와 Cell class를 사용하여 데이터를 추가하고 삭제할 수 있도록 하였다. 또한  list를 지울 때, 데이터도 지울 수 있게 하였다.  
  
``` cpp
......

 void AddNode(CELL::Cell* val) {
     Node* new_node = new Node(val);
     if (node == nullptr) {
         node = new_node;
     }
     else {
         Node* current = node;
         while (current->GetNext() != nullptr) {
             current = current->GetNext();
         }
         current->SetNext(new_node);
         new_node->SetPrev(current);
     }
 }
 
 ......
 
 void DeleteData() {
    while (node != nullptr) {
        Node* temp = node;
        node = node->GetNext();
        delete temp->data; 
        delete temp;       
    }
}

......
```
  
### Map 만들기  
Map class의 경우는 실제로 게임을 진행하는 map을 만드는 역할을 한다.  
실제 지뢰가 담길 list를 만들고, list에 담길 지뢰 위치를 만들어서 지뢰를 넣고, 주위에 지뢰 위치를 계산하여 이거까지 넣는 기능을 만들었다.  
  
``` cpp
class Map
{
private:
	int row_size;
	int column_size;
	int mine_num;
	DLIST::DbLinkedList* map_list;

public:
	Map(DLIST::DbLinkedList* map_list, int row_size, int column_size, int mine_num);
	~Map();
	void InitMembers(int row_size, int column_size, int mine_num);
	void MakeMap();
	void MakeMine();
	void CalculateNeighborMines();
	void ClearMap();
	void ShowMap();
	int ReturnRowSize();
	int ReturnColumnSize();
};
```  
  
지뢰 위치를 랜덤으로 정할 때는 set 라이브러리 즉 집합을 이용하여 만들었다. 
   
집합은 원소들이 중복이 허용이 되지 않고, 기본적으로 오름차순으로 정렬이 된다. 따라서 지뢰를 위치를 정할 때, 중복을 피할 수 있으면서 list를 순회하면서 차례대로 지뢰를 넣기에 알맞은 데이터 구조로 set을 사용하였다.  
  
또한 random 함수에서 seed를 현재 시간을 넣어 지금 할 수 있는 한에서 최대한의 난수를 만들 수 있도록 하였다.  
  
``` cpp
void Map::MakeMine() {
    srand((unsigned int)time(NULL)); 


    std::set<int> mine_indices;

    while (mine_indices.size() < mine_num)
    {
        int minePos = rand() % (row_size * column_size) + 1; 
        mine_indices.insert(minePos);
    };

    for (int element : mine_indices) {
        CELL::Cell* cell = this->map_list->GetData(element);
        cell->SetMine();
        std::cout << "mine num : " << element << std::endl;
        //cell->ShowMember();
    }
};
```  
  
주위 지뢰를 확인할 때는, 상대좌표로 계산하였다.  
  
어떤 k지점을 선택하였을 때, k 칸을 기준으로 8개 칸의 list위치 값이나 행렬의 값을 계산하였다.  
  
방식은 리스트를 돌면서 현재 row값과 column값에 따라 주위 8칸을 순회하도록 하였고, 8칸의 row와 column값을 통해 맵 밖으로 나갔는지 검사하면서 지뢰의 개수를 k번째 칸에 저장하도록 하였다.  
<p align="center">
  <img src="/assets/images/minesweeper/2/map.png" width="300px"/>
</p>
  
``` cpp
void Map::CalculateNeighborMines() {
        int delta_row[] = { -1, -1, -1, 0, 0, 1, 1, 1 };
        int delta_column[] = { -1,  0,  1, -1, 1, -1, 0, 1 };
        int delta_iter[] = { (-1 - 1 * column_size),(-1 * column_size) , (1 - 1 * column_size)
                             , -1, 1, (-1 + column_size), column_size, (1 + column_size) };

        int count_row = 0;
        int count_colum = 0;

        for (int iter = 1; iter <= row_size * column_size; iter++) {
            if ((iter % column_size) == 1) {
                count_row++;
            }
            count_colum = (iter - 1) % column_size + 1;
            for (int i = 0; i < 8; i++) {
                int temp_row = count_row + delta_row[i];
                int temp_column = count_colum + delta_column[i];

                if (temp_row < 1 || temp_row > row_size || temp_column < 1 || temp_column > column_size) {
                    continue;
                }

                CELL::Cell* cell = this->map_list->GetData(iter + delta_iter[i]);
                if (cell->IsMined()) {
                    cell = this->map_list->GetData(iter);
                    cell->SetNeighborMinesCount();
                }
            }
        }
    }
```  
  
### logic, ui 만들기  
사실 map까지 만드는 것은 그렇게 오래 걸리지 않았다. 하지만 qt를 다루는 과정과 실제 map을 이용하여 게임을 만드는 것이 오래 걸렸다.   
  
logic에서 클릭을 했을 때, 그게 만약 지뢰가 아니고 주위에 지뢰가 없다면 연쇄적으로 칸들이 열려야 한다. 현재칸에 열려 있지 않으면서, 지뢰가 없고, 주위에 지뢰가 없으면 DFS를 진행하도록 하였다. 근데 내가 알고 있던 지뢰 찾기와 달라서 찾아보니 주위 8칸에 지뢰가 없으면 그 칸을 전부 여는 것이어서 주위에 지뢰가 없다면 대각선도 하도록 만들었다.  

``` cpp
 void Logic::DFS(int row, int column) {
     int row_size = this->map_interface->ReturnRowSize();
     int column_size = this->map_interface->ReturnColumnSize();

     int list_data = column_size * (row - 1) + column;
     
     int delta_row[] =    { -1, -1, -1, 0, 0, 1, 1, 1 };
     int delta_column[] = { -1,  0,  1, -1, 1, -1, 0, 1 };
     int delta_iter[] = { (-1 - 1 * column_size),(-1 * column_size) , (1 - 1 * column_size), -1, 1, (-1 + column_size), column_size, (1 + column_size) };

     if (row < 1 || row > row_size || column < 1 || column > column_size) {
         return;
     }

     CELL::Cell* cell = this->map_list->GetData(list_data);

     if (cell->IsMined()) {
         return;
     }

     if (cell->IsOpend()) {
         return;
     }

     cell->SetOpened();
     //gui->ButtonHide(gui->FindButton(row, column));
     if (listener != nullptr) {
         listener->onEventOccurred(row, column); 
     }

     if (cell->NumNeighborMinesCount() > 0) {
         return;
     }

     Logic::DFS(row + delta_row[1], column + delta_column[1]);
     Logic::DFS(row + delta_row[3], column + delta_column[3]);
     Logic::DFS(row + delta_row[4], column + delta_column[4]);
     Logic::DFS(row + delta_row[6], column + delta_column[6]);
     for (int i = 0; i < 8; i++) {
         int temp_row = row + delta_row[i];
         int temp_column = column + delta_column[i];

         if (temp_row < 1 || temp_row > row_size || temp_column < 1 || temp_column > column_size) {
             continue;
         }
         cell = this->map_list->GetData(list_data + delta_iter[i]);
         if (cell->IsMined()) {
             return;
         }
     }
     Logic::DFS(row + delta_row[0], column + delta_column[0]);
     Logic::DFS(row + delta_row[2], column + delta_column[2]);
     Logic::DFS(row + delta_row[5], column + delta_column[5]);
     Logic::DFS(row + delta_row[7], column + delta_column[7]);
 }
```  
  
처음에 DFS기능을 만들때, ui속 칸을 여는 것을 game logic에서 담담하려고 했다. 
game logic은 말 그대로 logic을 담담하고 ui는 말 그대로 ui만 띄워야 한다고 생각했기 때문이다. 
하지만 이렇게 하니 logic에서도 ui를 선언해줘야 하고 ui에서도 logic을 참조해야 하는 관계가 생기게 되었다.  
  
내가 생각할 때는 서로 유연하게 상호작용하기 위해서 객체가 필요한 것이라 생각했는데, 오히려 종속성이 생겨버린 것이다.  
  
이때 알게된것이 event programing이다. 간단하게 내가 이해한 대로 말하자면 게임 같은 경우는 키보드나 마우스에 의해 클릭이 생겼을 때, 그에 따른 처리가 이루어져야 한다. 이처럼 어떤 객체가 신호를 보내면 그걸 듣고 있는 객체가 반응을 해서 또 다른 기능이 실행하는 것을 말하는 것 같다.  
  
따라서 logic에서 신호를 보내면 해당 칸을 ui에서 칸을 여는 방식으로 둘 간의 종속성을 조금 완화했다. 이는 c++에서는 가상함수라는 것을 통해 만들 수 있다. 가상함수를 시간이 없어 자세히 공부하지는 않았지만, 부모클래스에서 다시 정의할 수 있는 함수를 말하는 것 같다. 

``` cpp
class EventListener {
public:
    virtual void onEventOccurred(int row, int column) = 0; 
};
```   
  
위와 같이 가상함수를 만들고 logic에서 신호를 보내면, ui에서 그 신호에 맞는 함수를 재정의 해서 실행할 수 있다. 나의 경우는 row와 column값을 신호와 보내어서 그에 알맞은 버튼을 지우는 처리를 진행했다.  
  
``` cpp
void onEventOccurred(int row, int column) override {
    qDebug() << "row: " << row << "column: " << column;
    this->ButtonHide(this->FindButton(row, column));
}
```  
  
qt에서는 버튼에서 오른쪽 클릭에 대한 메소드가 진행이 되지 않는다.(왼쪽클릭만 존재) 따라서 깃발에 대한 상호작용을 하기 위해서 오른쪽 클릭에 대한 상호작용을 직접 구현했다. 이는 stack overflow에서 참고하여서 만들었다.   
  
<div align="center">
  <a href="https://stackoverflow.com/questions/15658464/qt-rightclick-qpushbutton">
    <img src="/assets/images/minesweeper/2/qt_card.png" width="600px" />
  </a>
</div>
  
이것도 event처리와 비슷하게 오른쪽 클릭이 발생하면 내가 만든 오른쪽 클릭 함수가 신호로 보내지고 아니면 원래 버튼의 기능의 신호가 보내지도록 하는 구문이다.  
``` cpp
#include <QPushButton>
#include <QMouseEvent>

class QRightClickButton : public QPushButton
{
    Q_OBJECT

public:
    explicit QRightClickButton(QWidget* parent = 0);

private slots:
    void mousePressEvent(QMouseEvent* e);

signals:
    void rightClicked();

public slots:

===================================================

#include "right_click.h"

QRightClickButton::QRightClickButton(QWidget* parent) :
    QPushButton(parent)
{
}

void QRightClickButton::mousePressEvent(QMouseEvent* e)
{
    if (e->button() == Qt::RightButton) {
        qDebug() << "Right button pressed!";
        emit rightClicked(); 
    }
    QPushButton::mousePressEvent(e);
    
}
```
  
그리고 원래 버튼클릭시 행동을 연결하듯 연결을 하면 되는데, 주의할 점은 stack overflow에서는 위에 줄처럼 되어 있는데, 어떤 버전 이상부터는 아래처럼 써야지 제대로 작동한다.  
  
위에처럼 쓰면 오류는 나지 않지만 작동하지 않음 (직접 디버깅을 해보니 신호는 보내지는 거 같은데 받고 실행이 안됨)  
  
``` cpp
//false
connect(button, SIGNAL(rightClicked()), this, SLOT(onRightClicked()));

//true
connect(button, &QRightClickButton::rightClicked, this, &MineswpeerGui::onRightClicked);
```
  
<p align="center">
  <img src="/assets/images/minesweeper/2/error1.png" width="600px"/>
  <br/> 오른쪽 클릭으로 신호는 보내는데 신호로 받은 함수가 실행이 안됨
</p>  
그리고 마지막으로는 qt에 관한 내용인데, 다양한 위젯을 부모 자식관계로 부모가 할당을 해제하면 자식 또한 데이터가 해제되는 형태를 띤다는 것을 알게 되어서 시작화면, 게임화면, 종료 장면 등을 class로 나누어서 각각의 ui를 띄우려고 하였는데, qt에서 처음 visual studio에서 만든 class만 사용해야 하는 건지 아니면 다른 에러가 있는 건지 자꾸 qt라이브러리를 불러오지 못하는 오류가 생겼다.  
  
내가 열심히 찾아보려고 하였지만 내가 qt 공부를 제대로 하지 않고 만드는 것이라 계속 새로운 프로젝트를 만들어도 라이브러리를 잡지 못하니깐, 무엇이 오류인지 모르고 이 걸 영어든 한국어든 검색해도 잘 못 찾겠어서 굉장히 힘이 많이 들었다. 다행히 프로젝트를 관리하고 있어서 오류가 없던 상태로 되돌렸지만, 이 이후로 qt는 기본적인 ui정도로만 제작하였다.   
<p align="center">
  <img src="/assets/images/minesweeper/2/error2.png" width="600px"/>
  <br/> 아직 원인을 찾지 못한 오류
</p>  
  
이 밖에도 여러 가지 내용이 있을 수 있으나 가장 중요한 내용과 내가 주로 고민했던 부분을 정리해 보았다.   