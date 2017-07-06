<?php
  $servername = "localhost";
  $username = "root";
  $password = "password";
  $dbname = "dbname";

  // 创建连接
  $conn = new mysqli($servername, $username, $password, $dbname);

  // 检测连接
  if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
  }else {
    if ($_POST["flag"] == 0) {
      $name = $_POST["name"];
      $address = $_POST["address"];
      $phone = $_POST["phone"];
      $score = $_POST["score"];
      $save_sql = "INSERT INTO score (name,address,phone,scores) VALUES ('".$name."','".$address."','".$phone."','".$score."')";
      if ($conn -> query($save_sql)) {
        echo "成功存入";
      };
      mysqli_close($conn);
    }else if($_POST["flag"] == 1){
      $search_sql = "SELECT scores FROM score ORDER BY scores";
      $result = $conn -> query($search_sql);
      if($result){
        if ($result->num_rows>0) {
          $row = mysqli_fetch_all($result,MYSQLI_ASSOC);
          print_r($row[99][scores]);
        }
      }else {
        echo mysqli_error($conn);
      };
      mysqli_close($conn);
    }
  }
?>
