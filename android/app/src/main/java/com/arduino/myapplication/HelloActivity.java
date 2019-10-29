package com.arduino.myapplication;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class HelloActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hello);

        Button pressMeButton =  findViewById(R.id.button_press);
        final EditText nameInput = findViewById(R.id.editName);
        pressMeButton.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                Toast toast = Toast.makeText(getApplicationContext(),
                        "Hello" +  nameInput.getText(),
                        Toast.LENGTH_SHORT);
                toast.show();

            }
        });

    }
}
